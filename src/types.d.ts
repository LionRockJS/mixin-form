declare module '@lionrockjs/central' {
  export class Central {
    static EXE_PATH: string;
    static config: any;
    static log(msg: any, ...args: any[]): void;
  }
  export class ControllerMixinView {
    static TEMPLATE: string;
  }
  export interface ControllerMixinViewState {
    data: any;
  }
}

declare module '@lionrockjs/mvc' {
  export class Controller {
    static STATE_REQUEST: string;
    static STATE_CLIENT: string;
    static STATE_RESPONSE: string;
  }
  export class ControllerMixin {
    static init(state: Map<string, any>): void;
  }
  export interface ControllerState {
    get(key: string): any;
    set(key: string, value: any): void;
  }
}
