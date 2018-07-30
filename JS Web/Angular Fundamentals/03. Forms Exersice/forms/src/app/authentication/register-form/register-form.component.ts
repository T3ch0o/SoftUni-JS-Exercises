import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public model : RegisterModel;
  public loginFailed : boolean;
  public errorMessage : string;

  constructor(private authService : AuthService,
              private router : Router) {
    this.model = new RegisterModel('','','','','', 18)
  }

  ngOnInit() {
  }

  register() {
    delete this.model['confirmPassword'];
    this.authService.register(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loginFailed = true;
          this.errorMessage = error.error.description;
        }
      )
  }
}
