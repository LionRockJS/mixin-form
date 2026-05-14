import MultipartParser from './adapter/MultipartParser.mjs';
import MultipartParserR2 from './adapter/MultipartParserR2.mjs';
import ControllerMixinMultipartForm from './controller-mixin/MultipartForm.mjs';
import ControllerMixinCaptcha from "./controller-mixin/Captcha.mjs";
import HelperForm from './helper/Form.mjs';
import FormCaptchaAdapter from './adapter/FormCaptchaAdapter.mjs';
import ConfigForm from './config/form.mjs';
export default {
    configs: {
        form: ConfigForm,
    }
};
export { MultipartParser, MultipartParserR2, ControllerMixinMultipartForm, ControllerMixinCaptcha, FormCaptchaAdapter, HelperForm, };
