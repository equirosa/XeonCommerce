import { FacturaDetalle } from './../_models/facturaDetalle';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class FacturaDetalleService {
private urlApi = `${environment.apiUrl}/api/FacturaDetalle`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<FacturaDetalle[]> {
    return this.http.get<FacturaDetalle[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<FacturaDetalle[]>('get', []))
	  );
  }
  getBy(id: number): Observable<FacturaDetalle> {
	const url = `${this.urlApi}/${id}`;
	return this.http.get<FacturaDetalle>(url).pipe(
	  tap(),
	  catchError(this.handleError<FacturaDetalle>(`getById`))
	);
  }

  create(log: FacturaDetalle): Observable<FacturaDetalle> {
    return this.http.post<FacturaDetalle>(this.urlApi, log, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<FacturaDetalle>('create'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`FacturaDetalle: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
