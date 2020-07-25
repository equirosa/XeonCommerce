import { Cupon } from './../_models/cupon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private urlApi = `${environment.apiUrl}/api/Cupon`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.urlApi).pipe(
      tap(),
      catchError(this.handleError<Cupon[]>('get', []))
    );
  }

  getBy(id: string): Observable<Cupon> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<Cupon>(url).pipe(
      tap(),
      catchError(this.handleError<Cupon>(`getById`))
    );
  }

  update(cupon: Cupon): Observable<any> {
    return this.http.put(`${this.urlApi}/${cupon.id}`, cupon, this.httpOptions).pipe(
      tap(_ => this.log(`updated`)),
      catchError(this.handleError<any>('update'))
    );
  }

  accion(cupon: Cupon): Observable<any> {
    return this.http.put(`${this.urlApi}/${cupon.id}`, cupon, this.httpOptions).pipe(
      tap(_ => this.log(`updated cupon value`)),
      catchError(this.handleError<any>('update'))
    );
  }

  create(cupon: Cupon): Observable<Cupon> {
    return this.http.post<Cupon>(this.urlApi, cupon, this.httpOptions).pipe(
      tap((nuevo: Cupon) => this.log(`created`)),
      catchError(this.handleError<Cupon>('create'))
    );
  }

  delete(cupon: Cupon): Observable<Cupon> {
    const url = `${this.urlApi}/${cupon.id}`;
    return this.http.delete<Cupon>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted`)),
      catchError(this.handleError<Cupon>('delete'))
    );
  }

  private log(message: string) {
    this.mensajeService.add(`Cupon: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }
}
