import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { HistorialVentasComponent } from './historial-ventas/historial-ventas.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import { ArchivoComponent } from './archivo/archivo.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { LandingPageAppComponent } from './landing-page-app/landing-page-app.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PerfilComercioComponent } from './perfil/comercio/comercio.component';
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
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ImpuestoComponent } from './impuesto/impuesto.component';
import { ServicioComponent } from './servicio/servicio.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
import { ComerciosComponent } from './comercios/comercios.component';
import { ComerciosCardComponent } from './comercios-card/comercios-card.component'
const empleadoModule = () => import('./empleado/empleado.module').then(x => x.EmpleadoModule);
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ConfigComponent } from './config/config.component';
import { ComercioRolComponent } from './comercio-rol/comercio-rol.component';
import { LandingPageXeonSquadComponent } from './landing-page-xeon-squad/landing-page-xeon-squad.component';
import { DashboardComercioComponent } from './dashboard-comercio/dashboard-comercio.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { PerfilSucursalComponent } from './perfil/sucursal/perfil-sucursal.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CategoriaUsuarioComponent } from './categoria-usuario/categoria-usuario.component';
import { ListCitaComercioComponent } from './list-cita-comercio/list-cita-comercio.component';
import { ListCitasEmpleadoComponent } from './list-citas-empleado/list-citas-empleado.component';

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
  { path: 'comercio/:id', component: PerfilComercioComponent, canActivate: [AuthGuard] },
  { path: 'landingEquipo', component: LandingPageXeonSquadComponent },
  { path: 'landingApp', component: LandingPageAppComponent },
  { path: 'dashboardComercio', component: DashboardComercioComponent, canActivate: [AuthGuard] },
  // { path: 'empleado', component: EmpleadoAdminComponent },
  { path: 'rol', component: ComercioRolComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard] },
    { path: 'sucursales', component: SucursalesComponent, canActivate: [AuthGuard] },
    { path: 'listar-usuarios', component: ListarUsuariosComponent, canActivate: [AuthGuard]},
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard] },
    { path: 'rol', component: ComercioRolComponent, canActivate: [AuthGuard] },
    { path: 'sucursal/:id', component: PerfilSucursalComponent, canActivate: [AuthGuard]},
    { path: 'dashboardAdmin', component: DashboardAdminComponent, canActivate: [AuthGuard]},
	{ path: 'configuraciones', component: ConfiguracionesComponent, canActivate: [AuthGuard]},
	{ path: 'archivos', component: ArchivoComponent, canActivate: [AuthGuard]},
	{ path: 'historial', component: HistorialComprasComponent, canActivate: [AuthGuard]},
	{ path: 'ventas', component: HistorialVentasComponent, canActivate: [AuthGuard]},
	{ path: 'recomendaciones', component: RecomendacionesComponent, canActivate: [AuthGuard]},
	
    { path: 'citasComercio', component: ListCitaComercioComponent, canActivate: [AuthGuard]},
    { path: 'citasEmpleado', component: ListCitasEmpleadoComponent, canActivate: [AuthGuard]},

  { path: 'categoriasUsuario', component: CategoriaUsuarioComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
