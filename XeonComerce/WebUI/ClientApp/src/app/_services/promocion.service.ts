import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';
import { Promocion } from '../_models/productoServicio';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private urlApi = `${environment.apiUrl}/api/productosyservicios`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(this.urlApi + "/1").pipe(
      tap(),
      catchError(this.handleError<Promocion[]>('get', []))
    );
  }

  getBy(id: string): Observable<Promocion> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<Promocion>(url).pipe(
      tap(),
      catchError(this.handleError<Promocion>(`getById`))
    );
  }

  update(promo: Promocion): Observable<any> {
    return this.http.put(`${this.urlApi}/${promo.id}`, promo, this.httpOptions).pipe(
      tap(_ => this.log(`updated`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(promo: Promocion): Observable<Promocion> {
    const url = `${this.urlApi}/${promo.id}`;
    return this.http.delete<Promocion>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted`)),
      catchError(this.handleError<Promocion>('delete'))
    );
  }

  private log(message: string) {
    this.mensajeService.add(`Promocion: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }
}
