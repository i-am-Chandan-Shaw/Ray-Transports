import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error occurred:',error);
        if (error.error.error == 'Token expired.') {
          
          this.snackBar.open(`${error.error.error}, Please login again`, 'OK',{
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 2000,
            panelClass: ['success-snackbar']
          });
          localStorage.removeItem('user')
          this.router.navigate(['/login'])
          
        }
        return throwError(error);
      })
    );
  }
}