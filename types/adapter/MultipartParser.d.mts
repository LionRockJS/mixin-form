import { IncomingMessage } from 'node:http';
export interface MultipartFile {
    tmp?: string;
    tmpName?: string;
    filename: string;
    encoding: string;
    mimetype: string;
    blob?: File;
}
export default class MultipartParser {
    static parse(incomingMessage: IncomingMessage, callback: (body: Record<string, any> | null) => void): void;
    static parseWebRequest(request: Request, _env?: any): Promise<Record<string, any> | null>;
}
