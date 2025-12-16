import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { Central } from '@lionrockjs/central';
import busboy from 'busboy';
import { IncomingMessage } from 'node:http';

const {unlink} = fs.promises;

export interface MultipartFile {
  tmp: string;
  tmpName: string;
  filename: string;
  encoding: string;
  mimetype: string;
}

export default class MultipartParser{
  static parse(incomingMessage: IncomingMessage, callback: (body: Record<string, any> | null) => void){
    if (!incomingMessage.headers['content-type'] || !/^multipart\/form-data/.test(incomingMessage.headers['content-type'])){
      callback(null);
      return;
    }

    const body: Record<string, any> = {}
    const bb = busboy({ headers: incomingMessage.headers });

    bb.on('file', (name: string, file: any, info: any)=> {
      const { filename, encoding, mimeType } = info;

      const tmpName = randomUUID();
      const filePath = path.normalize(`${Central.EXE_PATH}/../server/tmp/${tmpName}`);
      file.pipe(fs.createWriteStream(filePath));

      file.on('data', (data: any) => {
        if(Central.config.form?.debug) Central.log('File [' + name + '] got ' + data.length + ' bytes', false);
      }).on('close', () => {
        if(Central.config.form?.debug) Central.log(`File [${name}] done`, false);

        if(!filename){
          unlink(filePath).then(()=>{/***/});
          return;
        }

        body[name] = {
          tmp: filePath,
          tmpName: tmpName,
          filename: Buffer.from(filename, 'latin1').toString('utf8'),
          encoding,
          mimetype: mimeType,
        } as MultipartFile;
      });
    });

    bb.on('field', (name: string, val: any, info: any) => {
      //const {nameTruncated, valueTruncated, encoding, mimeType} = info;
      if(Central.config.form?.debug) Central.log([name, val, info], false);

      if (/\[]$/.test(name)) {
        //collect field[] as array
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
