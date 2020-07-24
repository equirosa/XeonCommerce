import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../_models/empleado';
import { Observable, Subject } from 'rxjs';
import { EmpleadoComercioSucursal } from '../_models/empleado-comercio-sucursal';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // cargar: boolean; 
  // private cargarSubject = new Subject<boolean>();
  // enviarCargarObservable = this.cargarSubject.asObservable();
  
  constructor( private http: HttpClient,  @Inject('BASE_URL') baseUrl: string ) { }

  // enviarCargar(cargar: boolean){
  //   this.cargar = cargar;
  //   this.cargarSubject.next(cargar);
  // }

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
