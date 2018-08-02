import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router : Router,
              private toastr : ToastrService) {
  }

  intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request)
      .pipe(tap((response : any) => {
        const instance = response instanceof HttpResponse;

        if (instance && response.body.token) {
          this.saveToken(response.body);
          this.toastr.success(response.body.message, 'Success!');
          this.router.navigate(['/furniture/all']);
        }

        if (instance && response.body.success && response.url.endsWith('signup')) {
          this.toastr.success(response.body.message, 'Success!');
          this.router.navigate(['/signin']);
        }

        if (instance && response.body.success && response.url.endsWith('create')) {
          this.toastr.success(response.body.message, 'Success!');
          this.router.navigate(['/furniture/all']);
        }
      }));
  }

  private saveToken(data) {
    localStorage.setItem('currentUser', JSON.stringify({
      'username': data.user.name,
      'token': data.token
    }))
  }
}
