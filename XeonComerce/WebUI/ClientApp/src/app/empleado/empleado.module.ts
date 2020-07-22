import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { FormEmpleadoComponent } from './components/form-empleado/form-empleado.component';
import { EmpleadoAdminComponent } from './pages/empleado-admin/empleado-admin.component';



@NgModule({
  declarations: [
    ListEmpleadosComponent,
    FormEmpleadoComponent, 
    EmpleadoAdminComponent],
  imports: [
    CommonModule,  
  ]
})
export class EmpleadoModule { }
