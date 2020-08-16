import { TransaccionFinanciera } from './../_models/transaccionFinanciera';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class TransaccionFinancieraService {
private urlApi = `${environment.apiUrl}/api/TranFin`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<TransaccionFinanciera[]> {
    return this.http.get<TransaccionFinanciera[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<TransaccionFinanciera[]>('get', []))
	  );
  }
  getBy(id: number): Observable<TransaccionFinanciera> {
	const url = `${this.urlApi}/${id}`;
	return this.http.get<TransaccionFinanciera>(url).pipe(
	  tap(),
	  catchError(this.handleError<TransaccionFinanciera>(`getById`))
	);
  }

  create(log: TransaccionFinanciera): Observable<any> {
    return this.http.post<any>(this.urlApi, log, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('create'))
    );
  }

  update(log: TransaccionFinanciera): Observable<any> {
    return this.http.put<any>(this.urlApi+"/"+log.id, log, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('actualizar'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`TransaccionFinanciera: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
