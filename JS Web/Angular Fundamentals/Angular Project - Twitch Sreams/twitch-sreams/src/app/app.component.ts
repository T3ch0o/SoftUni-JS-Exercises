import { Component, OnInit } from '@angular/core';

import { FormsService } from './core/services/forms.service';
import { ChatService } from './core/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public addCategoryComponent : boolean;
  public usersComponent : boolean;
  public chatComponent : boolean;
  public username : string;

  constructor(private formsService : FormsService,
              private chatService : ChatService) { }

  ngOnInit() {
    this.formsService.loadComponent
      .subscribe((opening) => {
        if (opening['component'] === 'category') {
          this.addCategoryComponent = opening['render'];
          this.usersComponent = false;
        } else if (opening['component'] === 'users') {
          this.usersComponent = opening['render'];
          this.addCategoryComponent = false;
        }
      }
    );

    this.chatService.loadComponent
      .subscribe(opening => {
        if (opening['component'] === 'chat') {
          this.chatComponent = opening['render'];
          this.username = opening['username'];
        }
      })
  }
}
