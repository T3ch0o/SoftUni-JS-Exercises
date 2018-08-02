import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateFurnitureModel } from './models/create-furniture.model';
import { IFurniture } from './models/furniture';

const createUrl = 'http://localhost:5000/furniture/create';
const allUrl = 'http://localhost:5000/furniture/all';
const detailsUrl = 'http://localhost:5000/furniture/details/';
const myFurnitureUrl = 'http://localhost:5000/furniture/mine';
const deleteUrl = 'http://localhost:5000/furniture/delete/';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http : HttpClient) {
  }

  createFurniture(body : CreateFurnitureModel) {
    return this.http.post(createUrl, body);
  }

  getAllFurniture() {
    return this.http.get<IFurniture[]>(allUrl);
  }

  getFurnitureDetails(id : string) {
    return this.http.get<IFurniture>(detailsUrl + id);
  }

  getMyFurniture() {
    return this.http.get<IFurniture[]>(myFurnitureUrl);
  }

  deleteFurniture(id : string) {
    return this.http.delete(deleteUrl + id);
  }
}
