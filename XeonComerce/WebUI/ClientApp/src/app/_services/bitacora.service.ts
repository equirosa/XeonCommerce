import { Bitacora } from '../_models/bitacora';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class BitacoraService {
private urlApi = `${environment.apiUrl}/api/Bitacora`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<Bitacora[]>('get', []))
	  );
  }
  getBy(id: number): Observable<Bitacora> {
	const url = `${this.urlApi}/${id}`;
	return this.http.get<Bitacora>(url).pipe(
	  tap(),
	  catchError(this.handleError<Bitacora>(`getById`))
	);
  }

  create(log: Bitacora): Observable<Bitacora> {
    return this.http.post<Bitacora>(this.urlApi, log, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Bitacora>('create'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`Bitacora: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
