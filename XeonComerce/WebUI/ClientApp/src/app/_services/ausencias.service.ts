import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ausencias } from '../_models/ausencias';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class AusenciasService {
  private urlAPI = `${environment.apiUrl}/api/ausencias`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private mensajeService: MensajeService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  get(): Observable<Ausencias[]> {
    return this.http.get<Ausencias[]>(this.urlAPI);
  }

  getById(id: string): Observable<Ausencias> {
    return this.http.get<Ausencias>(this.urlAPI + `/` + `${id}`);
  }

  create(ausencias: Ausencias): any {
    return this.http.post(this.urlAPI, ausencias);
  }

  update(ausencias: Ausencias): any {
    return this.http.put(this.urlAPI + '/' + ausencias.id, ausencias).pipe(
      tap(_ => {
        let a: any;
        a = _;
        this.log(a.msg)
      }),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: string): any {
    return this.http.delete(this.urlAPI + '/' + `${id}`);
  }

  private log(message: string) {
    this.mensajeService.add(`Configuraciones: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }
}
