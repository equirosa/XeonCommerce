import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../_models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor( private http: HttpClient,  @Inject('BASE_URL') baseUrl: string ) { }


  getEmpleados(idSucursal: string ): Observable<Empleado[]> {
   
    return this.http.get<Empleado[]>(`https://localhost:44343/api/empleado/GetEmpleadosByIdSucursal?idSucursal=${idSucursal}`);
  }

}
