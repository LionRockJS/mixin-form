import path from 'node:path';
import { stat, mkdir, copyFile, unlink } from 'node:fs/promises';
export default class HelperForm {
    static async moveToUpload(fileField, uploadRelativeDirectory = '/media', uploadRoot = 'public') {
        const today = new Date();
        const dateFolder = `${uploadRelativeDirectory}/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
        const uploadDateFolder = path.normalize(uploadRoot + dateFolder);
        //create folder
        try {
            await stat(uploadDateFolder);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                await mkdir(uploadDateFolder, { recursive: true });
            }
            else {
                throw err;
            }
        }
        const uploadPath = `${dateFolder}/${fileField.tmpName}-${fileField.filename}`;
        //move file to media/upload
        await copyFile(fileField.tmp, path.normalize(uploadRoot + uploadPath));
        await unlink(fileField.tmp);
        return uploadPath;
    }
}
