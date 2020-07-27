import { DiaFeriadoComponent } from './diaferiado/dia-feriado.component';
import { PromocionComponent } from './promocion/promocion.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { CrearComercioComponent } from './crear-comercio/crear-comercio.component';
import { CambiarContrasennaComponent } from './cambiar-contrasenna/cambiar-contrasenna.component';
import { RecuperarContrasennaComponent } from './recuperar-contrasenna/recuperar-contrasenna.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { EmpleadoAdminComponent } from './empleado/pages/empleado-admin/empleado-admin.component';
import { ProductoFormComponent } from './producto-form/producto-form.component'
import { ImpuestoComponent } from './impuesto/impuesto.component'
import { ServicioComponent } from './servicio/servicio.component'

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
import { ComerciosComponent } from './comercios/comercios.component';
import { ComerciosCardComponent } from './comercios-card/comercios-card.component'
const empleadoModule = () => import('./empleado/empleado.module').then(x => x.EmpleadoModule);
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { SucursalesComponent } from './sucursales/sucursales.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'comercios', component: ComerciosComponent, canActivate: [AuthGuard] },
    { path: 'solicitudes', component: SolicitudesComponent, canActivate: [AuthGuard] },
    { path: 'comercio', component: ComerciosCardComponent },
    { path: 'cuenta/registro', component: RegistroUsuarioComponent },
    { path: 'cuenta', loadChildren: accountModule },
    { path: 'empleado', loadChildren: empleadoModule},
    { path: 'cuenta/recuperar', component: RecuperarContrasennaComponent},
    { path: 'cambiarcontrasenna', component: CambiarContrasennaComponent},
    { path: 'productos', component: ProductoFormComponent, canActivate: [AuthGuard] },
    { path: 'impuestos', component: ImpuestoComponent, canActivate: [AuthGuard] },
    { path: 'servicios', component: ServicioComponent, canActivate: [AuthGuard] },
    { path: 'crearcomercio', component: CrearComercioComponent, canActivate: [AuthGuard]},
    { path: 'bitacora', component: BitacoraComponent, canActivate: [AuthGuard]},
    { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard]},
    { path: 'promocion', component: PromocionComponent, canActivate: [AuthGuard]},
    { path: 'diaferiado', component: DiaFeriadoComponent, canActivate: [AuthGuard]},
  // { path: 'empleado', component: EmpleadoAdminComponent },
  { path: 'sucursales', component: SucursalesComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
