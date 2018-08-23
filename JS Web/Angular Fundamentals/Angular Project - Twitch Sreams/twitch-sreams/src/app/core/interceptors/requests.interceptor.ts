import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FormsService } from '../services/forms.service';
import { AuthenticationService } from '../services/authentication.service';

const appKey = 'kid_r1H54C8SX';
const appSecret = 'a9fc2715968f4854bd39260eac09b1f2';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private router : Router,
              private formsService : FormsService,
              private authService : AuthenticationService) {
  }

  intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUser;

    if (request.url.includes('twitch')) {
      request = request.clone({
        setHeaders: {
          'Client-ID': `zs1tc2499443j4tmt06712h0gqkj1p`
        }
      });
    } else if (request.url.includes('categories') && request.method === 'PUT' || request.method === 'GET') {
      request = request.clone({
        setHeaders: {
          'Authorization': `Kinvey 4097425c-0471-481c-bf99-3b37d3fc1fff.Enf7YBOlzH61bMcCqbaSMXSYoWMA0ND8NMIEdk3Ir0w=`,
          'Content-Type': 'application/json'
        }
      });
    } else if (currentUser && currentUser.authtoken) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Kinvey ${currentUser.authtoken}`,
          'Content-Type': 'application/json'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request)
      .pipe(tap((response : any) => {
        const instance = response instanceof HttpResponse;
        const body = response.body ? response.body : {};

        if (instance && body.hasOwnProperty('_kmd') && body._kmd.hasOwnProperty('authtoken')) {
          this.saveToken(body);
        }

        if (instance && body.hasOwnProperty('_kmd') && (response.url.endsWith('login') || response.url.endsWith(appKey))) {
          this.formsService.toggleForm(false, 'login');
          this.formsService.toggleForm(false, 'register');
          this.router.navigate(['/browse/categories']);
        }

        if (instance && response.url.endsWith('logout')) {
          localStorage.clear();
          this.router.navigate(['/']);
        }

        if (instance && response.url.endsWith('categories') && response.statusText === 'Created') {
          this.formsService.toggleForm(false, 'category');
        }
      }));
  }

  private saveToken(data) {
    localStorage.setItem('currentUser', JSON.stringify({
      'username': data.username,
      'authtoken': data._kmd.authtoken,
      'imageUrl': data.imageUrl,
      'bannerUrl': data.bannerUrl,
      'isAdmin': data.isAdmin
    }));
  }
}
