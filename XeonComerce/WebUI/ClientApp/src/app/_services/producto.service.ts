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
    return this.http
      .get<Producto[]>(this.urlApi + "/1")
      .pipe(tap(), catchError(this.handleError<Producto[]>('get', []))
      );
  }


//  save(prod: Producto) {
//    if (prod.id) {
//      return this.put(prod);
//    }
//    return this.post(prod);
//  }

//  delete(prod: Producto) {
//    const headers = new Headers();
//    headers.append('Content-Type', 'application/json');

//    const url = `${this.productoApi + "/delete"}/${prod.id}`;

//    return this.http.delete<Producto>(url).pipe(catchError(this.handleError));
//  }

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

//  private put(prod: Producto) {
//    const headers = new Headers();
//    headers.append('Content-Type', 'application/json');

//    const url = `${this.productoApi + "/update"}/${prod.id}`;

//    return this.http.put<Producto>(url, prod).pipe(catchError(this.handleError));
//  }

  private log(message: string) {
    this.mensajeService.add(`productosyservicios: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }
}
