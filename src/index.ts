import MultipartParser from './MultipartParser.mjs';
import ControllerMixinMultipartForm from './controller-mixin/MultipartForm.mjs';
import ControllerMixinCaptcha from "./controller-mixin/Captcha.mjs";
import HelperForm from './helper/Form.mjs';
import FormCaptchaAdapter from './adapter/FormCaptchaAdapter.mjs';

export default {
  filename: import.meta.url,
  configs: ['form']
}

export{
  MultipartParser,
  ControllerMixinMultipartForm,
  ControllerMixinCaptcha,
  FormCaptchaAdapter,
  HelperForm,
}
