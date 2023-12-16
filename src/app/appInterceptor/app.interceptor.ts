import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    let user:any = localStorage.getItem('user')
    user = JSON.parse(user)
    let token = user ? user.token : null;

    return next.handle(
      request.clone({ setHeaders: { Authorization: `Bearer ${token}`} })
    );
  }
}
