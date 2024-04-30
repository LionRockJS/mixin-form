export default class FormCaptchaAdapter {
  static checkEnabled() {
    return true;
  }

  static async create(){
    return {
      text: "",
      data: "",
    }
  }

  static validate(state){
    return true;
  }
}