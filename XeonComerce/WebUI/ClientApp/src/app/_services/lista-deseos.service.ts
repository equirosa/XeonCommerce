import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';
import { ListaDeseos } from './../_models/listaDeseos';

@Injectable({
  providedIn: 'root'
})
export class ListaDeseosService {

  private urlApi = `${environment.apiUrl}/api/listaDeseos`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(idUsuario: string): Observable<ListaDeseos[]> {
    return this.http.get<ListaDeseos[]>(this.urlApi + "/" + idUsuario).pipe(
      tap(),
      catchError(this.handleError<ListaDeseos[]>('get', []))
    );
  }

  create(ltsDeseos: ListaDeseos): Observable<ListaDeseos> {
    return this.http.post<ListaDeseos>(this.urlApi, ltsDeseos, this.httpOptions).pipe(
      tap((nuevo: ListaDeseos) => this.log(`Se agregó el producto a lista de Deseos`)),
      catchError(this.handleError<ListaDeseos>('create'))
    );
  }

  delete(idUsuario: string, idProducto: number): Observable<ListaDeseos> {
    const urlLtsDeseos = `${this.urlApi}/${idUsuario}/${idProducto}`;
    return this.http.delete<ListaDeseos>(urlLtsDeseos, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó el producto`)),
      catchError(this.handleError<ListaDeseos>('delete'))
    );
  }

  deleteAll(idUsuario: string): Observable<ListaDeseos> {
    const urlLtsDeseos = `${this.urlApi}/${idUsuario}`;
    return this.http.delete<ListaDeseos>(urlLtsDeseos, this.httpOptions).pipe(
      tap(_ => this.log(`Se limpió la lista de Deseos`)),
      catchError(this.handleError<ListaDeseos>('limpiar'))
    );
  }

  private log(message: string) {
    this.mensajeService.add(`ListaDeseos: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }

}
