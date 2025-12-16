import { IncomingMessage } from 'node:http';
export interface MultipartFile {
    tmp: string;
    tmpName: string;
    filename: string;
    encoding: string;
    mimetype: string;
}
export default class MultipartParser {
    static parse(incomingMessage: IncomingMessage, callback: (body: Record<string, any> | null) => void): void;
}
