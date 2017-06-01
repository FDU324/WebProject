/**
 * Created by kadoufall on 2017/5/28.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class SocketService {
  socket;

  setSocketNull() {
    this.socket = null;
  }

  getSocket() {
    return this.socket;
  }

  socketConnect() {
    this.socket = io('http://localhost:3000', {'force new connection': true});
    this.socket.on('connect', () => {
      console.log('client_connects_success');
    });
    this.socket.on('connect_error', () => {
      console.log('connect_error');
    });

    this.socket.on('receiveNewFriendApply',(data)=>{
      console.log(data);
      console.log(typeof data);
    });

    // 确保socket成功建立再返回
    return this.emitPromise('confirmConnect', '').then(data => {
      console.log(data);
      if (data === 'success') {
        return Promise.resolve('success');
      } else {
        return Promise.resolve('error');
      }
    }).catch(error => {
      console.log('SocketService-socketConnect:', error);
    });
  }


  emitPromise(command, data) {
    return new Promise<any>((resolve, reject) => {
      this.socket.emit(command, data, (response) => {
        if (typeof response === 'object') {
          if (response.success === true) {
            resolve(response.data);
          } else {
            if (typeof response.message === "string") {
              reject(response.message);
            } else {
              reject("The request was not successful.")
            }
          }
        } else {
          reject('The response to your request could not be parsed.');
        }
      });
    });
  }


}
