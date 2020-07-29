import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Servicio } from '../_models/servicio';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private urlApi = `${environment.apiUrl}/api/productosyservicios`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private mensajeService: MensajeService) {
  }

  getServicio(): Observable<Servicio[]> {
    const urlServ = `${this.urlApi}/2`;
    return this.http
      .get<Servicio[]>(urlServ)
      .pipe(tap(), catchError(this.handleError<Servicio[]>('get', []))
      );
  }

  delete(serv: Servicio) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.urlApi}/${serv.id}`;

    return this.http.delete<Servicio>(url).pipe(catchError(this.handleError));
  }

  postServicio(servicio: Servicio) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Servicio>(this.urlApi, servicio)
      .pipe(catchError(this.handleError));
  }

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