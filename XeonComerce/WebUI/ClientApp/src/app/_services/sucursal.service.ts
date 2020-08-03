import { Sucursal } from './../_models/sucursal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class SucursalService {
  private urlApi = `${environment.apiUrl}/api/sucursal`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.urlApi).pipe(
      tap(),
      catchError(this.handleError<Sucursal[]>('get', []))
    );
  }
  getBy(id: string): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<Sucursal>(url).pipe(
      tap(),
      catchError(this.handleError<Sucursal>(`getById`))
    );
  }
  update(sucursal: Sucursal): Observable<any> {
    return this.http.put(`${this.urlApi}/${sucursal.id}`, sucursal, this.httpOptions).pipe(
      tap(_ => this.log(`Se actualizó`)),
      catchError(this.handleError<any>('update'))
    );
  }

  accion(Sucursal: Sucursal): Observable<any> {
    return this.http.put(`${this.urlApi}/${Sucursal.id}`, Sucursal, this.httpOptions).pipe(
      tap(_ => this.log(`Se cambió el estado del Sucursal`)),
      catchError(this.handleError<any>('update'))
    );
  }


  create(sucursal: Sucursal): Observable<any> {
    return this.http.post<Sucursal>(this.urlApi, sucursal, this.httpOptions).pipe(
      tap((nuevo: Sucursal) => this.log(`Se creó`)),
      catchError(this.handleError<Sucursal>('create'))
    );
  }

  delete(sucursal: Sucursal): Observable<any> {
    const url = `${this.urlApi}/${sucursal.id}`;
    return this.http.delete<Sucursal>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<Sucursal>('delete'))
    );
  }

  private log(message: string) {
    this.mensajeService.add(`Sucursal: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }

}
