import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  model : LoginModel;
  public loginFailed : boolean;
  public errorMessage : string;

  constructor(private authService : AuthService,
              private router : Router) {
    this.model = new LoginModel('','');
  }

  ngOnInit() {
  }

  login() {
    delete this.model['confirmPassword'];
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
        },
        error => {
          this.loginFailed = true;
          this.errorMessage = error.error.description;
        }
      )
  }

  successfulLogin(data) {
    this.authService.authtoken = data._kmd.authtoken;
    localStorage.setItem('authtoken', data._kmd.authtoken);
    localStorage.setItem('username', data.username);
    this.router.navigate(['/home']);
  }
}
