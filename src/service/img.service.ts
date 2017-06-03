/**
 * Created by kadoufall on 2017/5/3.
 */
import {Injectable} from "@angular/core";
import {Camera, ImagePicker} from "ionic-native";
import {File} from "@ionic-native/file"
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
        quality: 80,
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
    let reURL = 'error';
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
          reURL = 'error';
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
   *
   * @param user:传文件的user
   * @param url:文件的url
   * @param type:"userimage"表示用作头像,"moment"表示用作动态
   */
  sendFile(user,url,type){
    var fileTransfer : TransferObject = new Transfer().create();//this.transfer.create();
    const dest = "http://120.25.238.161:3000/upload/uploadImg.json";
    //let dest = "http://localhost:3000";
    //var op :FileUploadOptions = new FileUploadOptions();
    var options = {
      username:user.username,
      type:type,
    };
    var op : FileUploadOptions = {
      params : options,
    };
    return fileTransfer.upload(url,dest,op)
      .then( (data) => {
        //var resp = JSON.parse(data.response);
        if (data.responseCode == 200) {
          var resp = JSON.parse(data.response);
          var newURL:string = resp.url;
          return Promise.resolve(newURL);
        }
        return Promise.resolve('error');
      }).catch((error) => {
      console.log('ImgService-sendFile',error);
      return Promise.resolve('error');
    });

  }
  sendImgAsBase64ByURL(url){
    var canvas = document.createElement("canvas");
    var img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(url.lastIndexOf(".")+1).toLowerCase();
      if (ext === 'jpg')
        ext = 'jpeg';
      else if (ext === 'ico')
        ext = 'png';
      var dataURL = canvas.toDataURL("image/"+ext);
      console.log(dataURL);
      return dataURL;
    }
  }

}
