import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  public loginForm : FormGroup;
  public hide : boolean = true;

  constructor(private fb: FormBuilder,
              private formsService : FormsService,
              private authService : AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onCloseForm(event) {
    if (event.target.classList[0] === 'background' || event.target.classList[1] === 'fa-times') {
      this.formsService.toggleForm(false, 'login');
    }
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
      .subscribe();
  }
}
