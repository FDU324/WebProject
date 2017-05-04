/**
 * Created by wangziheng on 2017/5/3.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CityPickerService {

  constructor(public http: Http) {
  }

  getCitiesData(){
    return this.http.get('./assets/data/city-data.json')
      .toPromise()
      .then(response => response.json())
      .catch( err => {
        return Promise.reject(err)
      })

  }

}
