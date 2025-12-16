import path from 'node:path';
import { stat, mkdir, copyFile, unlink } from 'node:fs/promises';
import { Central } from '@lionrockjs/central';
import { MultipartFile } from '../MultipartParser.mjs';

export default class HelperForm{
  static async moveToUpload(fileField: MultipartFile, uploadRelativeDirectory: string='/media', uploadRoot: string= `${Central.EXE_PATH}/../public`){
    const today = new Date();
    const dateFolder = `${uploadRelativeDirectory}/${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
    const uploadDateFolder = path.normalize(uploadRoot + dateFolder);

    //create folder
    try{
      await stat(uploadDateFolder)
    }catch(err: any){
      if(err.code === 'ENOENT'){
        await mkdir(uploadDateFolder, {recursive: true});
      }else{
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
