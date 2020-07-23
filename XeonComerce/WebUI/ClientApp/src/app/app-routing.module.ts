import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { EmpleadoAdminComponent } from  './empleado/pages/empleado-admin/empleado-admin.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const empleadoModule = () => import('./empleado/empleado.module').then(x => x.EmpleadoModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cuenta', loadChildren: accountModule },
    { path: 'empleado', loadChildren: empleadoModule},
  // { path: 'empleado', component: EmpleadoAdminComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
