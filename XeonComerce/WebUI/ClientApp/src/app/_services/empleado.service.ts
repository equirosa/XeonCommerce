import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../_models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor( private http: HttpClient,  @Inject('BASE_URL') baseUrl: string ) { }


  getEmpleados(empleados: Empleado ): void {
    
  }

}
