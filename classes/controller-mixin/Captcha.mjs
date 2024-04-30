import {Controller, ControllerMixin} from "@lionrockjs/mvc";
import {ControllerMixinView} from "@lionrockjs/central";
import FormCaptchaAdapter from '../adapter/FormCaptchaAdapter.mjs';

export default class ControllerMixinCaptcha extends ControllerMixin {
  static defaultAdapter = FormCaptchaAdapter;
  static CAPTCHA_ADAPTER = 'captchaAdapter';

  static init(state) {
    if(!state.get(this.CAPTCHA_ADAPTER))state.set(this.CAPTCHA_ADAPTER, this.defaultAdapter);
  }

  static async assign_template_data(state) {
    const captcha = await state.get(this.CAPTCHA_ADAPTER).create();
    Object.assign(
      state.get(ControllerMixinView.TEMPLATE).data,
      captcha
    )
  }

  static async action_update(state) {
    if(state.get(this.CAPTCHA_ADAPTER).checkEnabled() === false)return;
    const isValid = state.get(this.CAPTCHA_ADAPTER).validate(state);
    if(!isValid){
      const client = state.get(Controller.STATE_CLIENT);
      await client.forbidden("Captcha validation failed.");
    }
  }
}