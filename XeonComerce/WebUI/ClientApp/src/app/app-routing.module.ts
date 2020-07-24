import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
import { ComerciosComponent } from './comercios/comercios.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'comercios', component: ComerciosComponent, canActivate: [AuthGuard] },
    { path: 'solicitudes', component: SolicitudesComponent, canActivate: [AuthGuard] },
    { path: 'cuenta', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }