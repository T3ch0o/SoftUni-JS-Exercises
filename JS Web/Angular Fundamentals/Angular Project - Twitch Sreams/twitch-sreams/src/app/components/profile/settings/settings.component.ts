import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { ProfileService } from '../../../core/services/profile.service';

import { Store } from '@ngrx/store';
import { IUser } from '../../../core/interfaces/user.interface';
import { AppState } from '../../../core/store/app.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', useAnimation(fadeIn))
    ])
  ]
})
export class SettingsComponent implements OnInit {
  public currentUser : object;
  public userForm : FormGroup;
  public user$ : IUser;
  private subscription : any;

  constructor(private authService : AuthenticationService,
              private fb : FormBuilder,
              private store : Store<AppState>,
              private profileService : ProfileService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      imageUrl: [''],
      bannerUrl: [''],
      biography: ['']
    });
    this.currentUser = this.authService.currentUser;
    setTimeout(() => {
      this.subscription = this.store.select('users')
        .subscribe(data => {
          this.user$ = data.find(u => u['username'] === this.currentUser['username']);
          this.userForm.patchValue({biography: this.user$.biography});
        });
    }, 1000);
  }

  get imageUrl() {
    return this.userForm.get('imageUrl');
  }

  get bannerUrl() {
    return this.userForm.get('bannerUrl');
  }

  get biography() {
    return this.userForm.get('biography');
  }

  setBackground() {
    return {
      backgroundImage: `url("${this.user$['bannerUrl']}")`
    }
  }

  onSubmit() {
    const userForm = this.userForm.value;
    const payload = this.user$;
    payload.imageUrl = userForm['imageUrl'];
    payload.bannerUrl = userForm['bannerUrl'];
    payload.biography = userForm['biography'];

    payload['imageUrl'] = userForm.imageUrl ? userForm.imageUrl : '/../../../../assets/images/profile/profile_image.jpg';
    payload['bannerUrl'] = userForm.bannerUrl ? userForm.bannerUrl : '/../../../../assets/images/profile/banner_image.png';

    this.setBackground();
    this.profileService.updateUser(payload);
  }
}
