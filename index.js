export default {
  filename: import.meta.url,
  configs: ['form']
}

import MultipartParser from './classes/MultipartParser.mjs';
import ControllerMixinMultipartForm from './classes/controller-mixin/MultipartForm.mjs';
import ControllerMixinCaptcha from "./classes/controller-mixin/Captcha.mjs";
import HelperForm from './classes/helper/Form.mjs';
import FormCaptchaAdapter from './classes/adapter/FormCaptchaAdapter.mjs';

export{
  MultipartParser,
  ControllerMixinMultipartForm,
  ControllerMixinCaptcha,
  FormCaptchaAdapter,
  HelperForm,
}