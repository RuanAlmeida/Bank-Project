import {
  HttpErrorResponse, HttpEvent, HttpHandler,



  HttpInterceptor, HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lang = localStorage.getItem('lang') || 'pt';

    request = request.clone({
        setHeaders: {
          'Accept-Language': lang
        }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastrService.error(error.message, error.statusText);
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
