import { MultipartFile } from '../adapter/MultipartParser.mjs';
export default class HelperForm {
    static moveToUpload(fileField: MultipartFile, uploadRelativeDirectory?: string, uploadRoot?: string): Promise<string>;
}
