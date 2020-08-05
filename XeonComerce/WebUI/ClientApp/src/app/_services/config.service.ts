import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../_models/config';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private urlAPI = `${environment.apiUrl}/api/config`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private mensajeService: MensajeService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  get(): Observable<Config[]> {
    return this.http.get<Config[]>(this.urlAPI);
  }

  getById(id: string): Observable<Config> {
    return this.http.get<Config>(this.urlAPI + `/` + `${id}`);
  }

  create(config: Config): any {
    return this.http.post(this.urlAPI, config);
  }

  update(config: Config): any {
    return this.http.put(this.urlAPI + '/' + config.id, config).pipe(
	  tap(_ => { let a: any;
	a = _;
	this.log(a.msg)}),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: string): any {
    return this.http.delete(this.urlAPI + '/' + `${id}`);
  }
  private log(message: string) {
    this.mensajeService.add(`Configuración: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${error}`);

      return of(result as T);
    };
  }


}
