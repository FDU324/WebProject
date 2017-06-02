/**
 * Created by kadoufall on 2017/6/2.
 */
import {NativeStorage} from '@ionic-native/native-storage';

export class MockStorage extends NativeStorage {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("BASE_64_ENCODED_DATA_GOES_HERE");
    })
  }

  setItem(reference, value) {
    return new Promise((resolve, reject) => {
      localStorage[reference] = value;
      resolve('success');
    });
  }

  getItem(reference) {
    return new Promise((resolve, reject) => {
      resolve(localStorage[reference]);
    });
  }

  keys() {
    return new Promise((resolve, reject) => {
      let re = [];
      for (let i = 0; i < localStorage.length; i++) {
        re.push(localStorage.key(i));
      }
      resolve(re);
    });
  }

}
