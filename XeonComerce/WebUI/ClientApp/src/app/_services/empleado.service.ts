import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../_models/empleado';
import { Observable, Subject } from 'rxjs';
import { EmpleadoComercioSucursal } from '../_models/empleado-comercio-sucursal';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlApi = `${environment.apiUrl}/api/empleado`;
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
    return this.http.get<Empleado[]>(this.urlApi+`/GetEmpleadosByIdSucursal?idSucursal=${idSucursal}`);
  }

  verificarUsuario(idUsuario: string): Observable<string>{
    return this.http.get<string>(this.urlApi+`/verificarUsuario?idUsuario=${idUsuario}`);
  }

  create(data: EmpleadoComercioSucursal): Observable<EmpleadoComercioSucursal>{
    var empleado = JSON.stringify(data);
    return this.http.post<EmpleadoComercioSucursal>(this.urlApi+'/create', empleado, {headers: this.headers});
  }

  eliminar(idEmpleado: number): Observable<EmpleadoComercioSucursal>{
    return this.http.delete<EmpleadoComercioSucursal>(this.urlApi+`/delete?idEmpleado=${idEmpleado}`);
  }
}
