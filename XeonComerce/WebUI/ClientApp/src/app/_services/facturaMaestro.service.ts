import { FacturaMaestro } from './../_models/facturaMaestro';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class FacturaMaestroService {
private urlApi = `${environment.apiUrl}/api/FacturaMaestro`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<FacturaMaestro[]> {
    return this.http.get<FacturaMaestro[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<FacturaMaestro[]>('get', []))
	  );
  }
  getBy(id: number): Observable<FacturaMaestro> {
	const url = `${this.urlApi}/${id}`;
	return this.http.get<FacturaMaestro>(url).pipe(
	  tap(),
	  catchError(this.handleError<FacturaMaestro>(`getById`))
	);
  }

  create(log: FacturaMaestro): Observable<FacturaMaestro> {
    return this.http.post<FacturaMaestro>(this.urlApi, log, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<FacturaMaestro>('create'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`FacturaMaestro: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
