export interface IUser {
  username : string;
  imageUrl : string;
  bannerUrl : string;
  friends : Array<string>;
  biography : string;
  isFriend? : boolean;
}
