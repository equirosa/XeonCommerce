import { Carrito } from './../_models/carrito';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class CarritoService {
private urlApi = `${environment.apiUrl}/api/Carrito`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(id: string): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.urlApi+"/"+id).pipe(
		tap(),
		catchError(this.handleError<Carrito[]>('get', []))
	  );
  }
  getBy(car: Carrito): Observable<Carrito> {
	const url = `${this.urlApi}/${car.idUsuario}/${car.idProducto}`;
	return this.http.get<Carrito>(url).pipe(
	  tap(),
	  catchError(this.handleError<Carrito>(`getById`))
	);
  }
  update(car: Carrito): Observable<any> {
	return this.http.put(`${this.urlApi}`, car, this.httpOptions).pipe(
	  tap(_ => this.log(`Se actualizó`)),
	  catchError(this.handleError<any>('update'))
	);
  }

  create(car: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(this.urlApi, car, this.httpOptions).pipe(
      tap((nuevo: Carrito) => this.log(`Se creó`)),
      catchError(this.handleError<Carrito>('create'))
    );
  }

  delete(car: Carrito): Observable<Carrito> {
    return this.http.delete<Carrito>(this.urlApi, Object.assign(this.httpOptions, {body:car})).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<Carrito>('delete'))
    );
  }

  limpiar(car: Carrito): Observable<Carrito> {
    return this.http.delete<Carrito>(this.urlApi+"/"+car.idUsuario, this.httpOptions).pipe(
      tap(_ => this.log(`Se limió`)),
      catchError(this.handleError<Carrito>('delete'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`Carrito: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
