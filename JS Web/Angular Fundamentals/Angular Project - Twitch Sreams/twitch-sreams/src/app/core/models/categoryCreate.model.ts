export class CategoryCreateModel {
  constructor(public name : string,
              public imageUrl : string,
              public banner : string,
              public streams : Array<string>) { }
}
