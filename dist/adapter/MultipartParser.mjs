import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { Central } from '@lionrockjs/central';
import busboy from 'busboy';
const { unlink } = fs.promises;
export default class MultipartParser {
    static parse(incomingMessage, callback) {
        if (!incomingMessage.headers['content-type'] || !/^multipart\/form-data/.test(incomingMessage.headers['content-type'])) {
            callback(null);
            return;
        }
        const body = {};
        const bb = busboy({ headers: incomingMessage.headers });
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            const tmpName = randomUUID();
            const tempDir = path.normalize(`${process.cwd()}${Central.config.form?.tempPath ?? '/server/tmp'}`);
            const filePath = path.normalize(`${tempDir}/${tmpName}`);
            file.pipe(fs.createWriteStream(filePath));
            file.on('data', (data) => {
                if (Central.config.form?.debug)
                    Central.log('File [' + name + '] got ' + data.length + ' bytes', false);
            }).on('close', () => {
                if (Central.config.form?.debug)
                    Central.log(`File [${name}] done`, false);
                if (!filename) {
                    unlink(filePath).then(() => { });
                    return;
                }
                body[name] = {
                    tmp: filePath,
                    tmpName: tmpName,
                    filename: Buffer.from(filename, 'latin1').toString('utf8'),
                    encoding,
                    mimetype: mimeType,
                };
            });
        });
        bb.on('field', (name, val, info) => {
            //const {nameTruncated, valueTruncated, encoding, mimeType} = info;
            if (Central.config.form?.debug)
                Central.log([name, val, info], false);
            if (/\[]$/.test(name)) {
                //collect field[] as array
                const k = name.replace('[]', '');
                body[k] = body[k] ?? [];
                body[k].push(val);
            }
            else {
                body[name] = val;
            }
        });
        bb.on('close', function () {
            callback(body);
        });
        incomingMessage.pipe(bb);
    }
    static async parseWebRequest(request, _env) {
        const contentType = request.headers.get('content-type') || '';
        if (!/^multipart\/form-data/.test(contentType))
            return null;
        const formData = await request.formData();
        const body = {};
        for (const [name, value] of formData.entries()) {
            if (typeof value !== 'string') {
                const fileValue = value;
                if (!fileValue.name)
                    continue;
                const fileEntry = {
                    filename: fileValue.name,
                    encoding: 'binary',
                    mimetype: fileValue.type,
                    blob: fileValue,
                };
                if (/\[]$/.test(name)) {
                    const k = name.replace('[]', '');
                    body[k] = body[k] ?? [];
                    body[k].push(fileEntry);
                }
                else {
                    body[name] = fileEntry;
                }
            }
            else {
                if (/\[]$/.test(name)) {
                    const k = name.replace('[]', '');
                    body[k] = body[k] ?? [];
                    body[k].push(value);
                }
                else {
                    body[name] = value;
                }
            }
        }
        return body;
    }
}
