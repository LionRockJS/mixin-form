import MultipartParser from './MultipartParser.mjs';
import ControllerMixinMultipartForm from './controller-mixin/MultipartForm.mjs';
import ControllerMixinCaptcha from "./controller-mixin/Captcha.mjs";
import HelperForm from './helper/Form.mjs';
import FormCaptchaAdapter from './adapter/FormCaptchaAdapter.mjs';

import ConfigForm from './config/form.mjs';

export default {
  configs: {
      form: ConfigForm,
  }
}

export{
  MultipartParser,
  ControllerMixinMultipartForm,
  ControllerMixinCaptcha,
  FormCaptchaAdapter,
  HelperForm,
}
