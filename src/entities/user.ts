import {Group} from "./group";
export class User {
  constructor(public username: string,
              public nickname: string,
              public userimage?: string,
              public location?: string,
              public groups?: Group[]) {
  }
}
