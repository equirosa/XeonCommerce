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
      tap((nuevo: CategoriaUsuario) => this.log(`Se agregó la categoría`)),
      catchError(this.handleError<CategoriaUsuario>('create'))
    );
  }

  delete(idUsuario: string, idCat: number): Observable<CategoriaUsuario> {
    const url = `${this.urlApi}/${idUsuario}/${idCat}`;
    return this.http.delete<CategoriaUsuario>(url, this.httpOptions).pipe(
      tap((nuevo: CategoriaUsuario) => this.log(`Se elimino la categoría`)),
      catchError(this.handleError<CategoriaUsuario>('delete'))
    );
  }

  deleteAll(id: string): Observable<CategoriaUsuario> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete<CategoriaUsuario>(url, this.httpOptions).pipe(
      tap((nuevo: CategoriaUsuario) => this.log(`Se eliminaron todas las categorías`)),
      catchError(this.handleError<CategoriaUsuario>('delete'))
    );
  }

  private log(message: string) {
    this.mensajeService.add(`Categoría: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }

}
