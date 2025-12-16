import {Central} from "@lionrockjs/central";

export interface CaptchaData {
  text: string;
  data: string;
}

export default class FormCaptchaAdapter {
  static checkEnabled(): boolean {
    Central.log('running Abstract FormCaptchaAdapter.checkEnabled');
    return true;
  }

  static async create(): Promise<CaptchaData>{
    Central.log('running Abstract FormCaptchaAdapter.create');
    return {
      text: "",
      data: "",
    }
  }

  static async validate(state: Map<string, any>): Promise<boolean>{
    Central.log('running Abstract FormCaptchaAdapter.validate');
    return true;
  }
}
