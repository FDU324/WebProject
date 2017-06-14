/**
 * Created by kadoufall on 2017/6/2.
 */
import {NativeStorage} from '@ionic-native/native-storage';

export class MockStorage extends NativeStorage {

  setItem(reference, value) {
    return new Promise((resolve, reject) => {
      localStorage[reference] = JSON.stringify(value);
      resolve('success');
    });
  }

  getItem(reference) {
    return new Promise((resolve, reject) => {
      if (localStorage[reference]) {
        resolve(JSON.parse(localStorage[reference]));
      } else {
        resolve(localStorage[reference]);
      }
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

  remove(reference) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(reference);
      resolve('success');
    });
  }

}
