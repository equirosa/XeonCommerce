import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { EmpleadoAdminComponent } from  './empleado/pages/empleado-admin/empleado-admin.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
import { ComerciosComponent } from './comercios/comercios.component';
import { ComerciosCardComponent } from './comercios-card/comercios-card.component'
const empleadoModule = () => import('./empleado/empleado.module').then(x => x.EmpleadoModule);
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component'

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'comercios', component: ComerciosComponent, canActivate: [AuthGuard] },
    { path: 'solicitudes', component: SolicitudesComponent, canActivate: [AuthGuard] },
    { path: 'comercio', component: ComerciosCardComponent },
    { path: 'registro', component: RegistroUsuarioComponent },
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
