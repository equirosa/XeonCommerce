import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Impuesto } from '../_models/impuesto';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  private urlApi = `${environment.apiUrl}/api/impuesto`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private mensajeService: MensajeService) {
  }

  getImpuesto(): Observable<Impuesto[]> {
    return this.http
      .get<Impuesto[]>(this.urlApi)
      .pipe(tap(), catchError(this.handleError<Impuesto[]>('get', []))
      );
  }

  postImpuesto(impuesto: Impuesto) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Impuesto>(this.urlApi, impuesto)
      .pipe(catchError(this.handleError));
  }

  private log(message: string) {
    this.mensajeService.add(`impuesto: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }

}
