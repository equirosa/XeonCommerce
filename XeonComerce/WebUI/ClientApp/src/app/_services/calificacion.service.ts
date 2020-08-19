import { Injectable } from '@angular/core';
import { Calificacion } from '../_models/Calificacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private urlApi = `${environment.apiUrl}/api/calificacion`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  obtenerCalificaciones(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.urlApi).pipe(
      tap(),
      catchError(this.handleError<Calificacion[]>('get', []))
    );
  }

  guardarCalificacion(calificacion: Calificacion): Observable<Calificacion> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Calificacion>(this.urlApi, calificacion, this.httpOptions).pipe(
      tap((nuevo: Calificacion) => this.log(`Se registró la calificación`)),
      catchError(this.handleError<Calificacion>('create'))
    );
  }

  eliminarCalificacion(id: number): Observable<Calificacion> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete<Calificacion>(url, this.httpOptions).pipe(
      tap((nuevo: Calificacion) => this.log(`Se eliminó la calificación`)),
      catchError(this.handleError<Calificacion>('delete'))
    );
  }

  private log(message: string) {
    this.mensajeService.add(`Calificación: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }
}
