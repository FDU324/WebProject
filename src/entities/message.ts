/**
 * Created by kadoufall on 2017/5/2.
 */
export class Message {
  constructor(public from: string,    // me friend
              public type: string,    // text, images, maps-locations, momennt
              public content,
              public time: string,) {
  }
}
