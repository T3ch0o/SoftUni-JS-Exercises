import { Component, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../../core/interfaces/user.interface';
import { AppState } from '../../../core/store/app.state';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { ProfileService } from '../../../core/services/profile.service';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class SidebarComponent implements OnInit {
  public users$ : Observable<IUser[]>;
  public query : string;

  constructor(private authService : AuthenticationService,
              private profileService : ProfileService,
              private store : Store<AppState>,
              private chatService : ChatService) { }

  ngOnInit() {
    this.profileService.getUsers()
      .subscribe(() => {
          this.users$ = this.store.select('users');
      });
  }

  search(value) {
    this.query = value;
  }

  loadComponent(component, username) {
    this.chatService.toggleForm(true, component, username);
  }
}
