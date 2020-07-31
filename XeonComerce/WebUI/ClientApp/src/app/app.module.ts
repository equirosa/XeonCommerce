import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';

import { EmpleadoModule } from './empleado/empleado.module';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component'
import { ProductoFormComponent, DialogProducto, DialogEditarProducto } from './producto-form/producto-form.component';
import { ImpuestoComponent, DialogImpuesto } from './impuesto/impuesto.component';
import { ServicioComponent, DialogServicio } from './servicio/servicio.component'
import { ComerciosComponent, DialogComercio, DialogDireccion } from './comercios/comercios.component';
import { DescuentosComponent, DialogPromocion } from './descuentos/descuentos.component';
import { ConfirmDialogComponent } from './_components/confirm-dialog/confirm-dialog.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ComerciosCardComponent, FiltroComerciosPipe } from './comercios-card/comercios-card.component';
import { DescuentosCardComponent} from './descuentos-card/descuentos-card.component';

import { MatNativeDateModule } from '@angular/material/core';
import { RecuperarContrasennaComponent } from './recuperar-contrasenna/recuperar-contrasenna.component';
import { CambiarContrasennaComponent } from './cambiar-contrasenna/cambiar-contrasenna.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
    imports: [
		FormsModule,
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
		ScheduleModule, 
		RecurrenceEditorModule,
		EmpleadoModule
	],
	entryComponents: [
		DialogComercio,
		ConfirmDialogComponent,
    DialogDireccion,
    DialogProducto,
    DialogImpuesto,
    DialogServicio,
    DialogEditarProducto,
    DialogPromocion
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
		ComerciosCardComponent,
		RegistroUsuarioComponent,
		RecuperarContrasennaComponent,
		CambiarContrasennaComponent,
		FiltroComerciosPipe,
     ProductoFormComponent,
    DialogProducto,
    ImpuestoComponent,
    DialogImpuesto,
    ServicioComponent,
    DialogServicio,
    DialogEditarProducto,
      DescuentosComponent,
      DescuentosCardComponent,
      DialogPromocion
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
    bootstrap: [AppComponent]
})
export class AppModule { };
