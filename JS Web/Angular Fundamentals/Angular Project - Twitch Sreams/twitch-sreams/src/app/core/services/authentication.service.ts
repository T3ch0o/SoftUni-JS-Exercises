import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

const appKey = 'kid_r1H54C8SX';

const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http : HttpClient) {  }

  register(body : RegisterModel) {
    // @ts-ignore
    delete body.repeatPassword;
    body.isAdmin = false;
    body.imageUrl = '/../../../../assets/images/profile/profile_image.jpg';
    body.bannerUrl = '/../../../../assets/images/profile/banner_image.png';
    body.biography = '';
    body.friends = [];

    return this.http.post(registerUrl, body);
  }

  login(body : LoginModel) {
    return this.http.post(loginUrl, body);
  }

  logout() {
    return this.http.post(logoutUrl, {});
  }

  isAuthenticated() : boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  isAdmin() : boolean {
    return  localStorage.getItem('currentUser') !== null && JSON.parse(localStorage.getItem('currentUser')).isAdmin;
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
