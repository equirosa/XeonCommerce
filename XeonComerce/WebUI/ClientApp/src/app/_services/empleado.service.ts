import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../_models/empleado';
import { Observable } from 'rxjs';
import { EmpleadoComercioSucursal } from '../_models/empleado-comercio-sucursal';

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

  verificarUsuario(idUsuario: string): Observable<string>{
    return this.http.get<string>(`https://localhost:44343/api/empleado/verificarUsuario?idUsuario=${idUsuario}`);
  }

  create(data: EmpleadoComercioSucursal): Observable<EmpleadoComercioSucursal>{
    var empleado = JSON.stringify(data);
    return this.http.post<EmpleadoComercioSucursal>('https://localhost:44343/api/empleado/create', empleado, {headers: this.headers});
  }

  eliminar(idEmpleado: number): Observable<EmpleadoComercioSucursal>{
    return this.http.delete<EmpleadoComercioSucursal>(`https://localhost:44343/api/empleado/delete?idEmpleado=${idEmpleado}`);
  }
}
