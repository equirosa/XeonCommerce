import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Producto } from '../_models/producto';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlApi = `${environment.apiUrl}/api/productosyservicios`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private mensajeService: MensajeService) {
  }

  getProducto(): Observable<Producto[]> {
    const urlProd = `${this.urlApi}/1`;
    return this.http
      .get<Producto[]>(urlProd)
      .pipe(tap(), catchError(this.handleError<Producto[]>('get', []))
      );
  }

  
  getProductoById(id: number): Observable<Producto> {
    const urlProd = `${this.urlApi}/${id}/1`;
    return this.http
      .get<Producto>(urlProd)
      .pipe(tap(), catchError(this.handleError<Producto>('getById'))
      );
  }

//  save(prod: Producto) {
//    if (prod.id) {
//      return this.put(prod);
//    }
//    return this.post(prod);
//  }

   delete(prod: Producto) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.urlApi}/${prod.id}`;

    return this.http.delete<Producto>(url).pipe(catchError(this.handleError));
  }


    postProducto(producto: Producto) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Producto>(this.urlApi, producto)
      .pipe(catchError(this.handleError));
  }

  //postProducto(producto: Producto) {
  //  return this.http.post<Producto>(this.urlApi, producto, this.httpOptions).pipe(
  //    tap((nuevo: Producto) => this.log(`Se creó`)),
  //    catchError(catchError(this.handleError))
  //  );
  //}

  //  putProducto(prod: Producto) {
  //  const headers = new Headers();
  //  headers.append('Content-Type', 'application/json');

  //    const url = `${this.urlApi}/${prod.id}`;

  //  return this.http.put<Producto>().pipe(catchError(this.handleError));
  //}

  putProducto(prod: Producto): Observable<any> {
    return this.http.put(`${this.urlApi}/${prod.id}`, prod, this.httpOptions).pipe(
      tap(_ => this.log(`Se actualizó`)),
      catchError(this.handleError<any>('update'))
    );
  }

  
  putProductoSilencioso(prod: Producto): Observable<any> {
    return this.http.put(`${this.urlApi}/${prod.id}`, prod, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('update'))
    );
  }

  private log(message: string) {
    this.mensajeService.add(`Producto: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
