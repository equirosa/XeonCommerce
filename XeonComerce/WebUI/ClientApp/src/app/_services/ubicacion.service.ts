import { Ubicacion } from './../_models/ubicacion';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class UbicacionService {
private urlApi = `https://ubicaciones.paginasweb.cr/`;
httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  getProvincias(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.urlApi}/provincias.json`).pipe(
		tap(),
		catchError(this.handleError<Ubicacion[]>('getProvincia', []))
	  );
  }

  
  getCantones(provincia: number): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.urlApi}/provincia/${provincia}/cantones.json`).pipe(
		tap(),
		catchError(this.handleError<Ubicacion[]>('getCantones', []))
	  );
  }

  
  getDistritos(provincia: number, canton: number): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.urlApi}/provincia/${provincia}/canton/${canton}/distritos.json`).pipe(
		tap(),
		catchError(this.handleError<Ubicacion[]>('getDistrito', []))
	  );
  }

  private log(message: string) {
	console.log(`UbicacionService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	  
	  if(error.error)
		this.log(`${error.error.msg || error.message || "Algún dato no es correcto"}`);
	  else
	 	this.log(`${error.message || "Algún dato no es correcto"}`);
	  
	  return of(result as T);
	};
  }

}
