export default class FormCaptchaAdapter {
  static checkEnabled() {
    //!Central.config.lead.recaptcha?.site_key
    return true;
  }

  static validate(state){
    return true;
  }
}