import { PDF } from './../_models/pdf';
import { Bitacora } from '../_models/bitacora';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root',
})

export class PDFService {
private urlApi = `${environment.apiUrl}/api/Pdf`;
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }
	
  descargar(pdf: PDF): Observable<any> {
	return this.http.post(this.urlApi, pdf, {
	  responseType: "blob",
	  headers: new HttpHeaders().append("Content-Type", "application/json")
	});
  }

  private log(message: string) {
	this.mensajeService.add(`PDF: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	  console.error(error);
	 	this.log(`${error}`);
	  
	  return of(result as T);
	};
  }

}
