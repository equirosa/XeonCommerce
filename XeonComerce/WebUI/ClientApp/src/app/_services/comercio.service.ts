import { Comercio } from './../_models/comercio';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class ComercioService {
private urlApi = `${environment.apiUrl}/api/Comercio`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Comercio[]> {
    return this.http.get<Comercio[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<Comercio[]>('get', []))
	  );
  }
  getBy(cedula: string): Observable<Comercio> {
	const url = `${this.urlApi}/${cedula}`;
	return this.http.get<Comercio>(url).pipe(
	  tap(),
	  catchError(this.handleError<Comercio>(`getById`))
	);
  }
  update(comercio: Comercio): Observable<any> {
	return this.http.put(`${this.urlApi}/${comercio.cedJuridica}`, comercio, this.httpOptions).pipe(
	  tap(_ => this.log(`Se actualizó`)),
	  catchError(this.handleError<any>('update'))
	);
  }

  
  accion(comercio: Comercio): Observable<any> {
	return this.http.put(`${this.urlApi}/${comercio.cedJuridica}`, comercio, this.httpOptions).pipe(
	  tap(_ => this.log(`Se cambió el estado del comercio`)),
	  catchError(this.handleError<any>('update'))
	);
  }


  create(comercio: Comercio): Observable<Comercio> {
    return this.http.post<Comercio>(this.urlApi, comercio, this.httpOptions).pipe(
      tap((nuevo: Comercio) => this.log(`Se creó`)),
      catchError(this.handleError<Comercio>('create'))
    );
  }

  delete(comercio: Comercio): Observable<Comercio> {
    const url = `${this.urlApi}/${comercio.cedJuridica}`;
    return this.http.delete<Comercio>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<Comercio>('delete'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`Comercio: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
