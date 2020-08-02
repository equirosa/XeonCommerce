import { Injectable, Inject } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VistaRol } from '../_models/vista-rol';
import { Vista } from '../_models/vista';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlApi = `${environment.apiUrl}/api/rol`;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor( private http: HttpClient, @Inject('BASE_URL') baseUrl: string ) { }


  getRoles( idComercio: string): Observable<VistaRol[]>{
    return this.http.get<VistaRol[]>( this.urlApi + `/getRolesByIdComercio?idComercio=${idComercio}`);
  }

  getVistas(): Observable<Vista[]>{
    return this.http.get<Vista[]>(`${environment.apiUrl}/api/vista/RetriveAll`);
  }
  
  getRol(id: number): Observable<VistaRol> {
    return this.http.get<VistaRol>( this.urlApi + `/RetriveById?id=${id}`);
  }

  guardar( vistaRol: VistaRol): Observable<VistaRol> {
    var r = JSON.stringify(vistaRol);
    if( vistaRol.id === 0){
      return this.http.post<VistaRol>(this.urlApi + `/create`, r, { headers: this.headers} );
    } else {
      return this.http.put<VistaRol>(this.urlApi + `/update`, r, { headers: this.headers} );
    }
  }

  delete(vistaRol: VistaRol): Observable<VistaRol> {
    return this.http.delete<VistaRol>(this.urlApi + `/delete?id=${vistaRol.id}`);
  }
}
