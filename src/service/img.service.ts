/**
 * Created by kadoufall on 2017/5/3.
 */
import { Injectable } from "@angular/core";
import { Camera, ImagePicker } from "ionic-native";

@Injectable()
export class ImgService {

  constructor() {
  }

  /**
   * 选取图片
   * 成功返回: Promise: 图片的路径数组
   * 失败返回： Promise: ['error']
   */
  openImgPicker() {
    let reURL = ['error'];
    if (!ImagePicker.hasReadPermission()) {
      ImagePicker.requestReadPermission();
    }

    if (ImagePicker.hasReadPermission()) {
      let options = {
        maximumImagesCount: 9,
        width: 800,
        height: 800,
        quality: 80
      };

      const re = ImagePicker.getPictures(options).then(
        (results) => {
          reURL = [];
          for (let i = 0; i < results.length; i++) {
            let tem = results[i];
            reURL.push(tem);
            console.log(tem);
          }
        }, (err) => {
          reURL = ['error'];
          console.log(err);
        }).then(() => {
          return reURL;
        });
      return re;
    } else {
      return Promise.resolve(reURL);
    }

  }

  /**
   * 拍照
   * 成功返回: Promise: 图片的路径
   * 失败返回： Promise: 'error'
   */
  openCamara() {
    let reURL = '';
    let options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
    };

    const re = Camera.getPicture(options).then((imageData) => {
      reURL = imageData;
      //console.log(imageData);
    }, (err) => {
      reURL = 'error';
      //console.log();
    }).then(() => { return reURL });

    return re;
  }


}
