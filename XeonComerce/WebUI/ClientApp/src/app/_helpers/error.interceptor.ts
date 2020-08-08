import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.accountService.logout();
            }
            
			let error = `${err.error.msg || err.message || "Algún dato no es correcto"}`;
			if(error.includes("constraint")) error = "Existen conflictos, deben de tomarse medidas primero";
			if(error.includes("Bad Request")) error = "Porfavor verifique los datos";
            return throwError(error);
        }))
    }
}