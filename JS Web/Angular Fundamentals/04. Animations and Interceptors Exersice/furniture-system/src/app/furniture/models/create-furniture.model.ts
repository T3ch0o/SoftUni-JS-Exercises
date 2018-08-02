export class CreateFurnitureModel {
  constructor(public make : string,
              public model : string,
              public year : number,
              public descritpion : string,
              public price : number,
              public image : string,
              public material? : string) { }
}
