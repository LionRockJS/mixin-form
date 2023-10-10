const path = require('path');
const {stat, mkdir, copyFile, unlink} = require('fs').promises;
const { KohanaJS } = require('kohanajs');

class HelperForm{
  static async moveToUpload(fileField, uploadRelativeDirectory='/media', uploadRoot= `${KohanaJS.EXE_PATH}/../public`){
    const today = new Date();
    const dateFolder = `${uploadRelativeDirectory}/${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
    const uploadDateFolder = path.normalize(uploadRoot + dateFolder);

    //create folder
    try{
      await stat(uploadDateFolder)
    }catch(err){
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

module.exports = HelperForm;