import { Usuario } from './../_models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
private urlApi = `${environment.apiUrl}/api/usuario`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  get(): Observable<Usuario[]> {
	const url = `${this.urlApi}/get`;
	return this.http.get<Usuario[]>(url).pipe(
		tap(),
		catchError(this.handleError<Usuario[]>('get', []))
	  );
  }

  
  getBy(cedula: string): Observable<Usuario> {
	const url = `${this.urlApi}/GetById/${cedula}`;
	return this.http.get<Usuario>(url).pipe(
	  tap(),
	  catchError(this.handleError<Usuario>(`getById`))
	);
  }


  update(usuario: Usuario): Observable<any> {
	return this.http.put(`${this.urlApi}/${usuario.id}`, usuario, this.httpOptions).pipe(
	  tap(_ => this.log(`Se actualizó`)),
	  catchError(this.handleError<any>('update'))
	);
  }


  emailVerification(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.urlApi+"/EmailVerification/"+usuario.id, usuario, this.httpOptions).pipe(
      tap(_ => this.log(`Se envió la verificación al email.`)),
      catchError(this.handleError<Usuario>('emailVerification'))
    );
  }

  phoneVerification(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.urlApi+"/PhoneVerification/"+usuario.id, usuario, this.httpOptions).pipe(
      tap(_ => this.log(`Se envió la verificación al número de teléfono.`)),
      catchError(this.handleError<Usuario>('phoneVerification'))
    );
  }
  
  sendClave(cedula: string): Observable<Usuario> {
	const url = `${environment.apiUrl}/api/Contrasenna/send/${cedula}/`;
	return this.http.get<Usuario>(url).pipe(
	  tap(),
	  catchError(this.handleError<Usuario>(`sendClave`))
	);
  }


  cambiarClave(contrasenna: string, cedula: string): Observable<any> {
	const url = `${environment.apiUrl}/api/Contrasenna/`;
	return this.http.post<any>(url, {contrasenna: contrasenna, idUsuario: cedula}, this.httpOptions).pipe(
	  tap((any: any) => this.log(`Se actualizó la contraseña.`)),
	  catchError(this.handleError<any>(`cambiarClave`))
	);
  }


  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlApi+"/create", usuario, this.httpOptions).pipe(
      tap((nuevo: Usuario) => this.log(`Se creó`)),
      catchError(this.handleError<Usuario>('create'))
    );  }

  delete(usuario: Usuario): Observable<Usuario> {
    const url = `${this.urlApi}/Update/${usuario.id}`;
    return this.http.delete<Usuario>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Se eliminó`)),
      catchError(this.handleError<Usuario>('delete'))
    );
  }

  private log(message: string) {
	this.mensajeService.add(`Usuario: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
