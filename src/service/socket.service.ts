/**
 * Created by kadoufall on 2017/5/28.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class SocketService {
  socket;

  initialSocket() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('client_connects_success');
    });

    this.socket.on('connect_error', () => {
      console.log('connect_error');
    });

    return this.socket;
  }

  getSocket() {
    return this.socket;
  }

  emitPromise(socket, command, data) {
    return new Promise((resolve, reject) => {
      socket.emit(command, data, (response) => {
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
