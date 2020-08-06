import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { EmpleadoAdminComponent } from './pages/empleado-admin/empleado-admin.component';
import { EmpleadoHorarioComponent } from './pages/empleado-horario/empleado-horario.component';
import { EmpleadoComercioComponent } from './pages/empleado-comercio/empleado-comercio.component';
import { CalendarioEmpleadoComponent } from './components/calendario-empleado/calendario-empleado.component';

const routes: Routes = [
    {
        path: 'admin',
        component: EmpleadoAdminComponent,
        canActivate: [AuthGuard],
        children: [
            //   { path:'admin', component: EmpleadoAdminComponent }
          ],
    },
    {
        path: 'horario/:idEmpleado',
        component: EmpleadoHorarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'calendario',
        component: CalendarioEmpleadoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'comercio',
        component: EmpleadoComercioComponent,
        canActivate: [AuthGuard],
        children: [
            //   { path:'admin', component: EmpleadoAdminComponent }
          ],

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpleadoRoutingModule { }



