export class RegisterModel {
  constructor(public username : string,
              public email : string,
              public password : number,
              public imageUrl : string,
              public isAdmin : boolean,
              public bannerUrl : string,
              public biography : string,
              public friends : Array<string>) { }
}
