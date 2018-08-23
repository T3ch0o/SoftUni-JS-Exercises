import { Component, OnInit } from '@angular/core';

import { FormsService } from '../../../core/services/forms.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private formsService : FormsService,
              private authService : AuthenticationService) {
  }

  ngOnInit() {
  }

  loadComponent(component) {
    this.formsService.toggleForm(true, component);
  }

  logout() {
    this.authService.logout()
      .subscribe();
  }
}
