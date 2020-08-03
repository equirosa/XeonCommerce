import { Archivo } from '../_models/Archivo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class ArchivoService {
private urlApi = `${environment.apiUrl}/api/Archivo`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Archivo[]> {
    return this.http.get<Archivo[]>(this.urlApi+"/retriveall").pipe(
		tap(),
		catchError(this.handleError<Archivo[]>('get', []))
	  );
  }
  getBy(id: number): Observable<Archivo> {
	const url = `${this.urlApi}/retrivebyid?id=${id}`;
	return this.http.get<Archivo>(url).pipe(
	  tap(),
	  catchError(this.handleError<Archivo>(`getById`))
	);
  }
  update(Archivo: Archivo): Observable<any> {
	return this.http.put(`${this.urlApi}/update`, Archivo, this.httpOptions).pipe(
	  tap(_ => this.log(`Se actualizó`)),
	  catchError(this.handleError<any>('update'))
	);
  }

  create(Archivo: Archivo): Observable<Archivo> {
    return this.http.post<Archivo>(this.urlApi+"/create", Archivo, this.httpOptions).pipe(
      tap((nuevo: Archivo) => this.log(`Se creó`)),
      catchError(this.handleError<Archivo>('create'))
    );
  }

  delete(Archivo: Archivo): Observable<Archivo> {
    const url = `${this.urlApi}/delete?id=${Archivo.id}`;
    return this.http.delete<Archivo>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<Archivo>('delete'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`Archivo: ${message}`);
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
