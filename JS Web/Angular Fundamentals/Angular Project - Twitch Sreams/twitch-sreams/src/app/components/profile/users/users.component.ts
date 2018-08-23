import { Component, OnDestroy, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { FormsService } from '../../../core/services/forms.service';
import { ProfileService } from '../../../core/services/profile.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { IUser } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', useAnimation(fadeIn))
    ])
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  public users$ : IUser[];
  public subscription : any;
  public userIsFriend : Object = {};

  constructor(private formsService : FormsService,
              private profileService : ProfileService,
              private authService : AuthenticationService,
              private store : Store<AppState>) { }

  ngOnInit() {
    this.profileService.getUsers()
      .subscribe(() => {
        this.subscription = this.store.select('users')
          .subscribe(data => {
            this.users$ = data;
            const currentUser = this.users$.find(u => u.username === this.authService.currentUser.username);
            for (const user of this.users$) {
              const username = user.username;
              this.userIsFriend[username] = currentUser.friends.includes(username);
            }
          });
      });
  }

  addToFriends(user) {
    const currentUser = this.users$.find(u => u.username === this.authService.currentUser.username);
    if (!currentUser.friends.includes(user)) {
      currentUser.friends.push(user);
      this.userIsFriend[user] = true;
    } else {
      const index = currentUser.friends.indexOf(user);
      currentUser.friends.splice(index, 1);
      this.userIsFriend[user] = false;
    }

    this.profileService.updateUser(currentUser);
  }

  onCloseForm(event) {
    if (event.target.classList[0] === 'background' || event.target.classList[1] === 'fa-times') {
      this.formsService.toggleForm(false, 'users');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
