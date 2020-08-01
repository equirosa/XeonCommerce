import { CategoriaComercio } from './../_models/categoriaComercio';
import { Categoria } from '../_models/categoria';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class CategoriaComercioService {
private urlApi = `${environment.apiUrl}/api/CategoriaComercio`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<CategoriaComercio[]> {
    return this.http.get<CategoriaComercio[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<CategoriaComercio[]>('get', []))
	  );
  }
  getByComercio(id: string): Observable<CategoriaComercio[]> {
	const url = `${this.urlApi}/${id}`;
	return this.http.get<CategoriaComercio[]>(url).pipe(
	  tap(),
	  catchError(this.handleError<CategoriaComercio[]>(`getById`))
	);
  }
  getBy(idC: string, id: number): Observable<CategoriaComercio> {
	const url = `${this.urlApi}/${idC}/${id}`;
	return this.http.get<CategoriaComercio>(url).pipe(
	  tap(),
	  catchError(this.handleError<CategoriaComercio>(`getById`))
	);
  }

  create(categoria: CategoriaComercio): Observable<CategoriaComercio> {
    return this.http.post<CategoriaComercio>(this.urlApi, categoria, this.httpOptions).pipe(
      tap((nuevo: CategoriaComercio) => this.log(`Se agregó la categoria`)),
      catchError(this.handleError<CategoriaComercio>('create'))
    );
  }

  delete(categoria: CategoriaComercio): Observable<CategoriaComercio> {
    const url = `${this.urlApi}`;
    return this.http.delete<CategoriaComercio>(url, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<CategoriaComercio>('delete'))
    );
  }

  deleteAll(cedula: string): Observable<CategoriaComercio> {
    const url = `${this.urlApi}/${cedula}`;
    return this.http.delete<CategoriaComercio>(url, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<CategoriaComercio>('delete'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`Categoria: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
