import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '@environments/environment';
import { CitaProducto } from '../_models/cita-producto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private urlApi = `${environment.apiUrl}/api/cita`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor( private http: HttpClient,  @Inject('BASE_URL') baseUrl: string ) { }


  create(data: CitaProducto): Observable<CitaProducto> {
    var cita = JSON.stringify(data);
    return this.http.post<CitaProducto>(this.urlApi + `/create`, cita, {headers: this.headers});
  }

  get(): Observable<CitaProducto[]>{
    return this.http.get<CitaProducto[]>(this.urlApi + `/retrieveAll`);
  }

  cancelar(cita: CitaProducto): Observable<CitaProducto>{
    return this.http.put<CitaProducto>(this.urlApi + `/cancelar`, cita, {headers: this.headers});
  }

  
  cancelarUsr(cita: CitaProducto): Observable<CitaProducto>{
    return this.http.put<CitaProducto>(this.urlApi + `/cancelarusr`, cita, {headers: this.headers});
  }

  notificar(data: CitaProducto): Observable<CitaProducto> {
    var cita = JSON.stringify(data);
    return this.http.post<CitaProducto>(this.urlApi + `/notificarCliente`, cita, {headers: this.headers});
  }

  finalizar(data: CitaProducto): Observable<CitaProducto>{
    var cita = JSON.stringify(data);
    return this.http.put<CitaProducto>(this.urlApi + `/finalizar`, cita, {headers: this.headers});
  }
}
