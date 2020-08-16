import { Direccion } from '../_models/Direccion';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class DireccionService {
private urlApi = `${environment.apiUrl}/api/Direccion`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.urlApi+"/retriveall").pipe(
		tap(),
		catchError(this.handleError<Direccion[]>('get', []))
	  );
  }
  getBy(id: number): Observable<Direccion> {
	const url = `${this.urlApi}/retrivebyid?id=${id}`;
	return this.http.get<Direccion>(url).pipe(
	  tap(),
	  catchError(this.handleError<Direccion>(`getById`))
	);
  }
  update(direccion: Direccion): Observable<any> {
	return this.http.put(`${this.urlApi}/update`, direccion, this.httpOptions).pipe(
	  tap(_ => this.log(`Se actualizó`)),
	  catchError(this.handleError<any>('update'))
	);
  }

  create(direccion: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(this.urlApi+"/create", direccion, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Direccion>('create'))
    );
  }

  delete(direccion: Direccion): Observable<Direccion> {
    const url = `${this.urlApi}/delete?id=${direccion.id}`;
    return this.http.delete<Direccion>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<Direccion>('delete'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`Direccion: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	  
	  if(error.error)
		this.log(`${error.error.msg || error.message || "Algún dato no es correcto"}`);
	  else
	 	this.log(`${error.message || "Algún dato no es correcto"}`);
	  
	  return of(result as T);
	};
  }

}
