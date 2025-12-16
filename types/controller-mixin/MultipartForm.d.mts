import { ControllerMixin } from '@lionrockjs/mvc';
export default class MultipartForm extends ControllerMixin {
    static POST_DATA: string;
    static GET_DATA: string;
    static REQUEST_DATA: string;
    static setup(state: Map<string, any>): Promise<void>;
}
