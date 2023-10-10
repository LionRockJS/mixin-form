const {KohanaJS} = require("kohanajs");
const { randomUUID } = require('crypto');
const path = require('path');
const busboy = require('busboy');
const fs = require('fs');
const {unlink} = fs.promises;
function log(message){
  if(KohanaJS.ENV === KohanaJS.ENV_PROD)return;
  console.log(message);
}

class MultipartParser{
  static parse(incomingMessage, callback){
    if (!/^multipart\/form-data/.test(incomingMessage.headers['content-type'])){
      callback(null);
      return;
    }

    const body = {}
    const bb = busboy({ headers: incomingMessage.headers });

    bb.on('file', (name, file, info)=> {
      const { filename, encoding, mimeType } = info;

      const tmpName = randomUUID();
      const filePath = path.normalize(`${KohanaJS.EXE_PATH}/../server/tmp/${tmpName}`);
      file.pipe(fs.createWriteStream(filePath));

      file.on('data', data => {
        log('File [' + name + '] got ' + data.length + ' bytes');
      }).on('close', () => {
        log(`File [${name}] done`);

        if(!filename){
          unlink(filePath).then(()=>{/***/});
          return;
        }

        body[name] = {
          tmp: filePath,
          tmpName: tmpName,
          filename,
          encoding,
          mimetype: mimeType,
        };
      });
    });

    bb.on('field', (name, val, info) => {
      //const {nameTruncated, valueTruncated, encoding, mimeType} = info;
      log([name, val, info]);

      if (/\[]$/.test(name)) {
        //collect field[] as array'
        const k = name.replace('[]', '');
        body[k] = body[k] ?? [];
        body[k].push(val);
      } else {
        body[name] = val;
      }
    });

    bb.on('close', function() {
      callback(body);
    });

    incomingMessage.pipe(bb);
  }
}

module.exports = MultipartParser;