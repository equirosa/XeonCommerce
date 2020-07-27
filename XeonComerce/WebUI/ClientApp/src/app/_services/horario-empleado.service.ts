import { Injectable, Inject } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeccionHorario } from '../_models/seccion-horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioEmpleadoService {
  
  private urlApi = `${environment.apiUrl}/api/seccionHorario`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor( private http: HttpClient,  @Inject('BASE_URL') baseUrl: string  ) { }


  getSeccionesHorario(idEmpleado: number, diaSemana: number): Observable<SeccionHorario[]>{
    return this.http.get<SeccionHorario[]>(
      this.urlApi + `/getHorarioEmpleado?idEmpleado=${idEmpleado}&diaSemana=${diaSemana}`);
  }

  guardar(empleado: SeccionHorario): Observable<SeccionHorario> {
    var e = JSON.stringify(empleado);
    if( empleado.id === 0){
      return this.http.post<SeccionHorario>(this.urlApi + `/create`, e,  {headers: this.headers});
    }else{      
      return this.http.put<SeccionHorario>(this.urlApi + `/update`, e, {headers: this.headers});
    }
  }

  eliminar(idHorario: number): Observable<SeccionHorario> {
    return this.http.delete<SeccionHorario>(this.urlApi + `/delete?id=${idHorario}`);
  }
  // create(empleado): Observable<SeccionHorario> {
  //   return this.http.post<SeccionHorario>(this.urlApi + `/create`, empleado,  {headers: this.headers});
  // }

  // update(empleado): Observable<SeccionHorario> {
  //   return this.http.put<SeccionHorario>(this.urlApi + `/update`, empleado, {headers: this.headers});
  // }
}
