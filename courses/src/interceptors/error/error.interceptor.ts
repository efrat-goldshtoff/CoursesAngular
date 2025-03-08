import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request URL start: ' + req.url);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `ERROR: ${error.error.message}`;
      } else {
        errorMessage = `ERROR: ${error.status}: ${error.message}`;
      }
      console.error(`ERROR: ${errorMessage}`);
      return throwError(() => error);
    })
  )
};
