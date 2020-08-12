import { CategoriaUsuario } from './../_models/categoriaUsuario';
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

export class CategoriaUsuarioService {
  private urlApi = `${environment.apiUrl}/api/categoriasUsuario`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<CategoriaUsuario[]> {
    return this.http.get<CategoriaUsuario[]>(this.urlApi).pipe(
      tap(),
      catchError(this.handleError<CategoriaUsuario[]>('get', []))
    );
  }

  getByUsuario(id: string): Observable<CategoriaUsuario[]> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<CategoriaUsuario[]>(url).pipe(
      tap(),
      catchError(this.handleError<CategoriaUsuario[]>(`getById`))
    );
  }

  getBy(idUsuario: string, idCat: number): Observable<CategoriaUsuario> {
    const url = `${this.urlApi}/${idUsuario}/${idCat}`;
    return this.http.get<CategoriaUsuario>(url).pipe(
      tap(),
      catchError(this.handleError<CategoriaUsuario>(`getById`))
    );
  }

  create(categoria: CategoriaUsuario): Observable<CategoriaUsuario> {
    return this.http.post<CategoriaUsuario>(this.urlApi, categoria, this.httpOptions).pipe(
      tap((nuevo: CategoriaUsuario) => this.log(`Se agregó la categoria`)),
      catchError(this.handleError<CategoriaUsuario>('create'))
    );
  }

  delete(categoria: CategoriaUsuario): Observable<CategoriaUsuario> {
    const url = `${this.urlApi}`;
    return this.http.delete<CategoriaUsuario>(url, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<CategoriaUsuario>('delete'))
    );
  }

  deleteAll(id: string): Observable<CategoriaUsuario> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete<CategoriaUsuario>(url, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<CategoriaUsuario>('delete'))
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
