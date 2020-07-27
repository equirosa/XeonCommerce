import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';
import { ProductoServicio } from '../_models/productoServicio';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private urlApi = `${environment.apiUrl}/api/productosyservicios`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<ProductoServicio[]> {
    return this.http.get<ProductoServicio[]>(this.urlApi).pipe(
      tap(),
      catchError(this.handleError<ProductoServicio[]>('get', []))
    );
  }

  getBy(descuento: string): Observable<ProductoServicio> {
    const url = `${this.urlApi}/${descuento}`;
    return this.http.get<ProductoServicio>(url).pipe(
      tap(),
      catchError(this.handleError<ProductoServicio>(`getById`))
    );
  }

  update(promo: ProductoServicio): Observable<any> {
    return this.http.put(`${this.urlApi}/${promo.descuento}`, promo, this.httpOptions).pipe(
      tap(_ => this.log(`updated`)),
      catchError(this.handleError<any>('update'))
    );
  }

  accion(promo: ProductoServicio): Observable<any> {
    return this.http.put(`${this.urlApi}/${promo.descuento}`, promo, this.httpOptions).pipe(
      tap(_ => this.log(`updated descuento`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(promo: ProductoServicio): Observable<ProductoServicio> {
    const url = `${this.urlApi}/${promo.descuento}`;
    return this.http.delete<ProductoServicio>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted`)),
      catchError(this.handleError<ProductoServicio>('delete'))
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
