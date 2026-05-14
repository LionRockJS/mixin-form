export interface MultipartFileR2 {
    r2Key: string;
    filename: string;
    encoding: string;
    mimetype: string;
    size: number;
}
export default class MultipartParserR2 {
    /** Standard WebFileParser interface — delegates to parseWebRequestToR2 */
    static parseWebRequest(request: Request, env?: any): Promise<Record<string, any> | null>;
    static parseWebRequestToR2(request: Request, env: any): Promise<Record<string, any>>;
}
