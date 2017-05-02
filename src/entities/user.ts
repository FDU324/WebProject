export class User {
  constructor(public username: string,
              public nickname: string,
              public password: string,
              public userimage?: string,
              public location?: string) {
  }
}
