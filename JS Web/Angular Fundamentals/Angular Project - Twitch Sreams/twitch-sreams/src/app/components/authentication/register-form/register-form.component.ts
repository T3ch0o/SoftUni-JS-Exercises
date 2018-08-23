import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public registerForm : FormGroup;
  public hide : boolean = true;

  constructor(private fb : FormBuilder,
              private formsService : FormsService,
              private authService : AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      repeatPassword: ['', [
        Validators.required
      ]]
    },
      {
        validator: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['repeatPassword'].value
      ? null
      : frm.controls['repeatPassword'].setErrors({ 'mismatch': true });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

  onCloseForm(event) {
    if (event.target.classList[0] === 'background' || event.target.classList[1] === 'fa-times') {
      this.formsService.toggleForm(false, 'register');
    }
  }

  onSubmit() {
    this.authService.register(this.registerForm.value)
      .subscribe();
  }
}
