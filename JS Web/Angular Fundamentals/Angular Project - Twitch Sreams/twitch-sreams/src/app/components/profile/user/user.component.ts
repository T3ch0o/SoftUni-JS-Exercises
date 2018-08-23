import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { ProfileService } from '../../../core/services/profile.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { IUser } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', useAnimation(fadeIn))
    ])
  ]
})
export class UserComponent implements OnInit, OnDestroy {
  public user$ : IUser;
  private subscription : any;

  constructor(private store : Store<AppState>,
              private route : ActivatedRoute,
              private profileService : ProfileService,
              private router : Router,
              private authService : AuthenticationService) { }

  ngOnInit() {
    setTimeout(() => {
      this.subscription = this.store.select('users')
        .subscribe(data => {
          const username = this.route.snapshot.params.id;
          this.user$ = data.find(u => u['username'] === username);
          if (!this.user$) {
            this.router.navigate(['browse/categories']);
          } else if(this.user$.username === this.authService.currentUser.username) {
            this.router.navigate(['user/settings'])
          }
          this.user$.biography = this.user$.biography.length === 0 ? 'Nothing in here....' : this.user$.biography;
        });
    }, 1000);
  }

  setBanner(path) {
    return {
      background: `radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%), url("${path}")`,
      'background-size': 'cover',
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
