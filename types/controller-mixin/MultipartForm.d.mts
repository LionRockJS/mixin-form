import { ControllerMixin } from '@lionrockjs/mvc';
export interface WebFileParser {
    parseWebRequest(raw: Request, env?: any): Promise<Record<string, any> | null>;
}
export default class MultipartForm extends ControllerMixin {
    static POST_DATA: string;
    static GET_DATA: string;
    static REQUEST_DATA: string;
    /** Swap this to MultipartParserR2 (or any WebFileParser) for different upload backends */
    static fileAdapter: WebFileParser;
    static setup(state: Map<string, any>): Promise<void>;
}
