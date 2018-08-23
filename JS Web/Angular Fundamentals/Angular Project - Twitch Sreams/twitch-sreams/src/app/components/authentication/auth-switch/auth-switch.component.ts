import { Component, OnInit } from '@angular/core';

import { FormsService } from '../../../core/services/forms.service';

@Component({
  selector: 'app-auth-switch',
  templateUrl: './auth-switch.component.html',
  styleUrls: ['./auth-switch.component.css']
})
export class AuthSwitchComponent implements OnInit {
  public currentForm = '';

  constructor(private formsService : FormsService) { }

  ngOnInit() {
    this.formsService.loadComponent.subscribe(
      (opening) => {
        this.currentForm = opening['component'];
      }
    );
  }

  switchComponent(component) {
    this.formsService.toggleForm(true, component);
  }
}
