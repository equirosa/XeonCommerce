import { Categoria } from './../_models/categoria';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
private urlApi = `${environment.apiUrl}/api/Categoria`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlApi).pipe(
		tap(),
		catchError(this.handleError<Categoria[]>('get', []))
	  );
  }
  getBy(id: number): Observable<Categoria> {
	const url = `${this.urlApi}/${id}`;
	return this.http.get<Categoria>(url).pipe(
	  tap(),
	  catchError(this.handleError<Categoria>(`getById`))
	);
  }
  update(categoria: Categoria): Observable<any> {
	return this.http.put(`${this.urlApi}/${categoria.id}`, categoria, this.httpOptions).pipe(
	  tap(_ => this.log(`Se actualizó`)),
	  catchError(this.handleError<any>('update'))
	);
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlApi, categoria, this.httpOptions).pipe(
      tap((nuevo: Categoria) => this.log(`Se creó`)),
      catchError(this.handleError<Categoria>('create'))
    );
  }

  delete(categoria: Categoria): Observable<Categoria> {
    const url = `${this.urlApi}/${categoria.id}`;
    return this.http.delete<Categoria>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<Categoria>('delete'))
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
