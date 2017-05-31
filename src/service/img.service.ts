/**
 * Created by kadoufall on 2017/5/3.
 */
import {Injectable} from "@angular/core";
import {Camera, ImagePicker} from "ionic-native";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
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

      return ImagePicker.getPictures(options).then(
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
    } else {
      return Promise.resolve(reURL);
    }

  }

  /**
   * 选取图片，只能选一张
   * 成功返回: Promise: 图片的路径数组
   * 失败返回： Promise: ['error']
   */
  openImgPickerSingle() {
    let reURL = ['error'];
    if (!ImagePicker.hasReadPermission()) {
      ImagePicker.requestReadPermission();
    }

    if (ImagePicker.hasReadPermission()) {
      let options = {
        //maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };

      return ImagePicker.getPictures(options).then(
        (results) => {
          reURL = results[0];
          console.log(results[0]);
        }, (err) => {
          reURL = ['error'];
          console.log(err);
        }).then(() => {
        return reURL;
      });
    } else {
      return Promise.resolve(reURL);
    }

  }

  /**
   * 拍照
   * 成功返回: Promise: 图片的路径
   * 失败返回： Promise: 'error'
   */
  openCamara(type?:string) {
    let re;
    let options = {
      quality: 100,
      destinationType: type==='base64'?Camera.DestinationType.DATA_URL:Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
    };

    return Camera.getPicture(options).then((imageData) => {
      if (type === 'base64') {
        re = "data:image/jpeg;base64," + imageData;
      } else {
        re = imageData;
      }
      //console.log(imageData);
    }, (err) => {
      re = 'error';
      //console.log();
    }).then(() => {
      return re
    });

  }
  /**
   * 传入一个file对象，将其以二进制流的方式传给服务器
   */
  sendFile(user,url){
    var fileTransfer : TransferObject = new Transfer().create();//this.transfer.create();
    const dest = "http://120.25.238.161:3000/upload.json";
    var options = {
      user:user,
      filename:"test.jpg",
    }
    fileTransfer.upload(url,dest,options).then((data) => {
      alert("正在上传");
    }, (err) => {
      alert("出错啦");
    });

  }

}
