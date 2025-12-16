export interface CaptchaData {
    text: string;
    data: string;
}
export default class FormCaptchaAdapter {
    static checkEnabled(): boolean;
    static create(): Promise<CaptchaData>;
    static validate(state: Map<string, any>): Promise<boolean>;
}
