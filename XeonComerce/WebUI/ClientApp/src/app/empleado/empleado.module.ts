import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { FormEmpleadoComponent } from './components/form-empleado/form-empleado.component';
import { EmpleadoAdminComponent } from './pages/empleado-admin/empleado-admin.component';
import { MatTableModule } from '@angular/material/table';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ListEmpleadosComponent,
    FormEmpleadoComponent, 
    EmpleadoAdminComponent],
  imports: [
    CommonModule,  
    MatTableModule, 
    MatPaginatorModule,
    EmpleadoRoutingModule,
  ]
})
export class EmpleadoModule { }
