import { Injectable, Inject } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioSucursal } from '../_models/horario-sucursal';

@Injectable({
  providedIn: 'root'
})
export class HorarioSucursalService {

  private urlApi = `${environment.apiUrl}/api/horarioSucursal`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor( private http: HttpClient,  @Inject('BASE_URL') baseUrl: string ) { }


  get(): Observable<HorarioSucursal[]> {
    return this.http.get<HorarioSucursal[]>(this.urlApi + `/retrieveAll`);
  }

  guardar(horario: HorarioSucursal): Observable<HorarioSucursal> {
    var h = JSON.stringify(horario);
    if( horario.id === 0){
      return this.http.post<HorarioSucursal>(this.urlApi + `/create`, h, {headers: this.headers});
    } else {
      return this.http.put<HorarioSucursal>(this.urlApi + `/update`, h, {headers: this.headers});
    }
  }

  delete(horario: HorarioSucursal): Observable<HorarioSucursal>{
    return this.http.delete<HorarioSucursal>( this.urlApi + `/delete?id=${horario.id}`);
  }

}
