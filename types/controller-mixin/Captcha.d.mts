import { ControllerMixin } from "@lionrockjs/mvc";
import FormCaptchaAdapter from '../adapter/FormCaptchaAdapter.mjs';
export default class ControllerMixinCaptcha extends ControllerMixin {
    static defaultAdapter: typeof FormCaptchaAdapter;
    static CAPTCHA_ADAPTER: string;
    static init(state: Map<string, any>): void;
    static assign_template_data(state: Map<string, any>): Promise<void>;
    static action_update(state: Map<string, any>): Promise<void>;
}
