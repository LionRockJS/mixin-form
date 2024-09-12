import {Central} from "@lionrockjs/central";
export default class FormCaptchaAdapter {
  static checkEnabled() {
    Central.log('running Abstract FormCaptchaAdapter.checkEnabled');
    return true;
  }

  static async create(){
    Central.log('running Abstract FormCaptchaAdapter.create');
    return {
      text: "",
      data: "",
    }
  }

  static async validate(state){
    Central.log('running Abstract FormCaptchaAdapter.validate');
    return true;
  }
}