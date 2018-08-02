import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';
import { IFurniture } from '../models/furniture';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {
  public furnitures : Observable<IFurniture[]>;

  constructor(private furnitureService : FurnitureService,
              private router : Router) { }

  ngOnInit() {
    this.furnitures = this.furnitureService.getMyFurniture();
  }

  deleteItem(id : string) {
    this.furnitureService.deleteFurniture(id)
      .subscribe(() => {
        this.router.navigate(['/furniture/all'])
      });
  }
}
