import MultipartParser from './adapter/MultipartParser.mjs';
import MultipartParserR2 from './adapter/MultipartParserR2.mjs';
import ControllerMixinMultipartForm from './controller-mixin/MultipartForm.mjs';
import ControllerMixinCaptcha from "./controller-mixin/Captcha.mjs";
import HelperForm from './helper/Form.mjs';
import FormCaptchaAdapter from './adapter/FormCaptchaAdapter.mjs';
import type { WebFileParser } from './controller-mixin/MultipartForm.mjs';
declare const _default: {
    configs: {
        form: {
            tempPath: string;
            debug: boolean;
        };
    };
};
export default _default;
export { MultipartParser, MultipartParserR2, ControllerMixinMultipartForm, ControllerMixinCaptcha, FormCaptchaAdapter, HelperForm, type WebFileParser, };
