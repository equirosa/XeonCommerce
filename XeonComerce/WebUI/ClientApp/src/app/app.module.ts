import { RecomendacionesComponent } from "./recomendaciones/recomendaciones.component";
import { HistorialVentasComponent } from "./historial-ventas/historial-ventas.component";
import { HistorialComprasComponent } from "./historial-compras/historial-compras.component";
import {
  ArchivoComponent,
  DialogImagen,
  DialogEditarArchivo,
} from "./archivo/archivo.component";
import { ConfiguracionesComponent } from "./configuraciones/configuraciones.component";
import { CarritoDialogFinComponent } from "./_components/carrito/fin/fin.dialog";
import { CarritoDialogPayPalComponent } from "./_components/carrito/paypal/paypal.dialog";
import { CarritoDialogSinpeComponent } from "./_components/carrito/sinpe/sinpe.dialog";
import { CarritoDialogMetodoPagoComponent } from "./_components/carrito/metodo-pago/metodo-pago.dialog";
import { CarritoDialogDireccionComponent } from "./_components/carrito/destino/destino.dialog";
import {
  DiaFeriadoComponent,
  DialogDiaFeriado,
} from "./diaferiado/dia-feriado.component";
import {
  PromocionComponent,
  PromocionDialog,
} from "./promocion/promocion.component";
import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AppComponent } from "./app.component";
import { AlertComponent } from "./_components";
import { HomeComponent } from "./home";

import { EmpleadoModule } from "./empleado/empleado.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatDividerModule } from "@angular/material/divider";
import { MatPaginatorModule } from "@angular/material/paginator";
import {
  ComerciosComponent,
  DialogComercio,
  DialogDireccion,
  DialogArchivo,
} from "./comercios/comercios.component";
import { ConfirmDialogComponent } from "./_components/confirm-dialog/confirm-dialog.component";
import { SolicitudesComponent } from "./solicitudes/solicitudes.component";
import {
  ComerciosCardComponent,
  FiltroComerciosPipe,
} from "./comercios-card/comercios-card.component";
import { RegistroUsuarioComponent } from "./registro-usuario/registro-usuario.component";
import {
  ProductoFormComponent,
  DialogProducto,
  DialogEditarProducto,
} from "./producto-form/producto-form.component";
import {
  ImpuestoComponent,
  DialogImpuesto,
} from "./impuesto/impuesto.component";
import {
  ServicioComponent,
  DialogServicio,
  DialogEditarServicio,
} from "./servicio/servicio.component";
import { LandingPageAppComponent } from "./landing-page-app/landing-page-app.component";

import { MatNativeDateModule } from "@angular/material/core";
import { RecuperarContrasennaComponent } from "./recuperar-contrasenna/recuperar-contrasenna.component";
import { CambiarContrasennaComponent } from "./cambiar-contrasenna/cambiar-contrasenna.component";
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
} from "@syncfusion/ej2-angular-schedule";


import { ListCitasEmpleadoComponent } from './list-citas-empleado/list-citas-empleado.component';
import { FinalizarCitaEmpleadoComponent } from './finalizar-cita-empleado/finalizar-cita-empleado.component';
import { FinalizarCitaDatosComponent } from './finalizar-cita-datos/finalizar-cita-datos.component';
import { FinalizarCitaProductosComponent } from './finalizar-cita-productos/finalizar-cita-productos.component';
import { ListCitasClienteComponent } from './list-citas-cliente/list-citas-cliente.component';
import { PerfilCitaClienteComponent } from './perfil-cita-cliente/perfil-cita-cliente.component';
import { CrearComercioComponent } from "./crear-comercio/crear-comercio.component";
import {
  CloudinaryModule,
  CloudinaryConfiguration,
  provideCloudinary,
} from "@cloudinary/angular-5.x";
import * as Cloudinary from "cloudinary-core";
import { FileSelectDirective } from "ng2-file-upload";
import { FileUploadModule } from "ng2-file-upload";
import { UploadComercioFilesComponent } from "./crear-comercio/upload-comercio-files.dialog";
import { AgmCoreModule } from "@agm/core";
import {
  BitacoraComponent,
  DialogUsuario,
} from "./bitacora/bitacora.component";
import {
  CategoriaComponent,
  DialogCategoria,
} from "./categoria/categoria.component";
import { NavComponent } from "./nav/nav.component";
import { NavlistComponent } from "./navlist/navlist.component";
import {
  SucursalesComponent,
  DialogSucursal,
  DialogDireccionSucursal,
} from "./sucursales/sucursales.component";
import { ConfigComponent } from "./config/config.component";
import { PerfilComercioComponent } from "./perfil/comercio/comercio.component";
import { ComercioRolComponent } from "./comercio-rol/comercio-rol.component";
import { ListRolComponent } from "./list-rol/list-rol.component";
import { FormRolComponent } from "./form-rol/form-rol.component";
import { LandingPageXeonSquadComponent } from "./landing-page-xeon-squad/landing-page-xeon-squad.component";
import { DashboardComercioComponent } from "./dashboard-comercio/dashboard-comercio.component";
import {
  ListarUsuariosComponent,
  DialogDireccionUsuario,
} from "./listar-usuarios/listar-usuarios.component";
import { CarritoComponent } from "./carrito/carrito.component";
import { PerfilSucursalComponent } from "./perfil/sucursal/perfil-sucursal.component";
import { FormHorarioSucursalComponent } from "./form-horario-sucursal/form-horario-sucursal.component";

import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";
import {
  CategoriaUsuarioComponent,
} from "./categoria-usuario/categoria-usuario.component";
import { ProductoCitaComponent } from "./_components/producto-cita/producto-cita.component";
import { FormCitaProductoComponent } from "./form-cita-producto/form-cita-producto.component";
import { ListCitaComercioComponent } from "./list-cita-comercio/list-cita-comercio.component";
import { PerfilUsuarioComponent } from "./perfil/usuario/usuario.component";

import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';
import { CalificacionDialogComponent } from './calificacion-dialog/calificacion-dialog.component';
import { ListaCalificacionesComponent } from './lista-calificaciones/lista-calificaciones.component';
import { FormCitaServicioComponent } from './form-cita-servicio/form-cita-servicio.component';
@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: "de99h9v43",
      api_secret: "szrKGouDzr9bgYSTXF_a8LO7nMI",
      api_key: "664882358892716",
    }),
    FileUploadModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDividerModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBHWLv4zAfQsEsZoRzI2aHKCpcYy_QjLOk",
    }),
    ScheduleModule,
    RecurrenceEditorModule,
    EmpleadoModule,
  ],
  entryComponents: [
    DialogComercio,
    ConfirmDialogComponent,
    DialogDireccion,
    DialogProducto,
    DialogImpuesto,
    DialogServicio,
    DialogEditarProducto,
    UploadComercioFilesComponent,
    DialogArchivo,
    DialogUsuario,
    DialogCategoria,
    PromocionDialog,
    DialogEditarServicio,
    DialogSucursal,
    DialogDiaFeriado,
    DialogDireccionSucursal,
    DialogDireccionUsuario,
    DialogUsuario,
    CarritoDialogDireccionComponent,
    CarritoDialogMetodoPagoComponent,
    CarritoDialogSinpeComponent,
    CarritoDialogPayPalComponent,
    CarritoDialogFinComponent,
    DialogImagen,
    DialogEditarArchivo,
    CalificacionDialogComponent
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ComerciosComponent,
    DialogComercio,
    ConfirmDialogComponent,
    DialogDireccion,
    SolicitudesComponent,
    DialogDiaFeriado,
    DiaFeriadoComponent,
    ComerciosCardComponent,
    RegistroUsuarioComponent,
    RecuperarContrasennaComponent,
    FiltroComerciosPipe,
    ProductoFormComponent,
    DialogProducto,
    ImpuestoComponent,
    DialogImpuesto,
    ServicioComponent,
    DialogServicio,
    DialogEditarProducto,
    PromocionDialog,
    CambiarContrasennaComponent,
    UploadComercioFilesComponent,
    DialogArchivo,
    BitacoraComponent,
    DialogEditarServicio,
    DialogUsuario,
    CategoriaComponent,
    DialogCategoria,
    NavComponent,
    NavlistComponent,
    SucursalesComponent,
    DialogSucursal,
    DialogDireccionSucursal,
    PromocionComponent,
    ConfigComponent,
    PerfilComercioComponent,
    ComercioRolComponent,
    ListRolComponent,
    FormRolComponent,
    LandingPageXeonSquadComponent,
    DashboardComercioComponent,
    ListarUsuariosComponent,
    DialogDireccionUsuario,
    CarritoComponent,
    FormRolComponent,
    PerfilSucursalComponent,
    FormHorarioSucursalComponent,
    DashboardAdminComponent,
    CarritoDialogDireccionComponent,
    CarritoDialogMetodoPagoComponent,
    CarritoDialogSinpeComponent,
    CarritoDialogPayPalComponent,
    CarritoDialogFinComponent,
    ConfiguracionesComponent,
    ArchivoComponent,
    DialogImagen,
    DialogEditarArchivo,
    CategoriaUsuarioComponent,
    RecomendacionesComponent,
    ProductoCitaComponent,
    FormCitaProductoComponent,
    ListCitaComercioComponent,
    HistorialComprasComponent,
    HistorialVentasComponent,
    LandingPageXeonSquadComponent,
    DashboardComercioComponent,
    DashboardAdminComponent,
    PerfilUsuarioComponent,
    ProductoCitaComponent,
		FormCitaProductoComponent,
		ListCitaComercioComponent,
    ListCitasEmpleadoComponent,
		FinalizarCitaEmpleadoComponent,
		FinalizarCitaDatosComponent,
		FinalizarCitaProductosComponent,
		ListCitasClienteComponent,
		PerfilCitaClienteComponent,
    FormCitaServicioComponent,
    ListaDeseosComponent,
    CalificacionDialogComponent,
    ListaCalificacionesComponent
  ], 
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		MatDatepickerModule,
		MatNativeDateModule,
		DayService, 
		WeekService,
		WorkWeekService, 
		MonthService, 
		MonthAgendaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
