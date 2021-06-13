import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {


  constructor(private injector: Injector) {}

  handleError(error: Error) {

    if (error instanceof HttpErrorResponse) {
      this.toastrService.error(error.message, error.statusText);
    } else {
      this.toastrService.error(error.message, error.name);
    }
  }

   private get toastrService(): ToastrService {
     return this.injector.get(ToastrService);
  }
}
