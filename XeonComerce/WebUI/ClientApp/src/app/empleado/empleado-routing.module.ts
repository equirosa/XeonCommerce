import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { EmpleadoAdminComponent } from './pages/empleado-admin/empleado-admin.component';
import { EmpleadoHorarioComponent } from './pages/empleado-horario/empleado-horario.component';

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
        path: 'horario',
        component: EmpleadoHorarioComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpleadoRoutingModule { }


