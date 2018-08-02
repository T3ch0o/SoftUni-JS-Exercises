import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { IFurniture } from '../models/furniture';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures : Observable<IFurniture[]>;

  constructor(private furnitureService : FurnitureService) { }

  ngOnInit() {
    this.furnitures = this.furnitureService.getAllFurniture();
  }

}
