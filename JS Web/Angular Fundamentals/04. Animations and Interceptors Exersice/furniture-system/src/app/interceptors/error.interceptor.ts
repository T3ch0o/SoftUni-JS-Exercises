import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, 
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr : ToastrService) { }

  intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((error : HttpErrorResponse)  => {
        switch (error.status) {
          case 401:
            this.toastr.error(error.error.message, 'Warning!');
            break;
          case 400:
            const message = Object.keys(error.error.errors)
              .map(e => error.error.errors[e])
              .join('\n');
            this.toastr.error(message, 'Warning!')
            break;
        }
        
        return throwError(error);
      }));
  }
}
