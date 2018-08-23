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
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((error : HttpErrorResponse)  => {
        switch (error.status) {
          case 401:
            break;
          case 400:
            break;
        }

        return throwError(error);
      }));
  }
}
