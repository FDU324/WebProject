/**
 * Created by kadoufall on 2017/5/22.
 */
import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'myDatePipe'})
export class MyDatePipe implements PipeTransform {
  transform(value: number): string {
    let show = new Date(value);
    let difference = (Date.now() - value) / 1000;     // 秒数

    let hour = show.getHours() < 10 ? '0' + show.getHours() : show.getHours();
    let minutes = show.getMinutes() < 10 ? '0' + show.getMinutes() : show.getMinutes();

    if (difference > 31536000) {     // >1年
      return show.getFullYear() + '年' + (show.getMonth() + 1) + '月' + show.getDate() + '日 ' + hour + ':' + minutes;
    } else if (difference > 86400) {           // 1日< show < 1年
      return (show.getMonth() + 1) + '月' + show.getDate() + '日 ' + hour + ':' + minutes;
    } else {          // 当日
      return hour + ':' + minutes;
    }

  }
}
