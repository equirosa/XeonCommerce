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
}
