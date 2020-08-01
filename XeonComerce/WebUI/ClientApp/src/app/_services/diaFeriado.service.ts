import { DiaFeriado } from './../_models/dia-feriado';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class DiaFeriadoService {
private urlApi = `${environment.apiUrl}/api/DiaFeriado`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<DiaFeriado[]> {
    return this.http.get<DiaFeriado[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<DiaFeriado[]>('get', []))
	  );
  }
  getBy(cedula: string): Observable<DiaFeriado> {
	const url = `${this.urlApi}/${cedula}`;
	return this.http.get<DiaFeriado>(url).pipe(
	  tap(),
	  catchError(this.handleError<DiaFeriado>(`getById`))
	);
  }
  update(diaF: DiaFeriado): Observable<any> {
	return this.http.put(`${this.urlApi}/${diaF.id}`, diaF, this.httpOptions).pipe(
	  tap(_ => this.log(`Se actualizó`)),
	  catchError(this.handleError<any>('update'))
	);
  }

  create(diaF: DiaFeriado): Observable<DiaFeriado> {
    return this.http.post<DiaFeriado>(this.urlApi, diaF, this.httpOptions).pipe(
      tap((nuevo: DiaFeriado) => this.log(`Se creó`)),
      catchError(this.handleError<DiaFeriado>('create'))
    );
  }

  delete(diaF: DiaFeriado): Observable<DiaFeriado> {
    const url = `${this.urlApi}/${diaF.id}`;
    return this.http.delete<DiaFeriado>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<DiaFeriado>('delete'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`DiaFeriado: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
