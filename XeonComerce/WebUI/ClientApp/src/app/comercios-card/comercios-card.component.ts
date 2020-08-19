import { Comercio } from '../_models/comercio';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ComercioService } from '../_services/comercio.service';
import { MensajeService } from '../_services/mensaje.service';
import { UbicacionService } from '../_services/ubicacion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DireccionService } from '../_services/direccion.service';
import { DialogDireccion } from '../comercios/comercios.component';
import {PageEvent} from '@angular/material/paginator';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
	selector: 'app-comercios-card',
	templateUrl: './comercios-card.component.html',
	styleUrls: ['./comercios-card.component.css']
  })
  export class ComerciosCardComponent implements OnInit {

	comercios: Comercio[];
	length;
	pageSize = 5;
	filtro: string;
	pageEvent: PageEvent;
	
	constructor(public dialog: MatDialog, private comercioService: ComercioService, private direccionService: DireccionService, private mensajeService: MensajeService, private ubicacionService: UbicacionService) { }
  

	
	  ngOnInit() {
	  this.getComercios();
	}
	
	  getComercios(): void {
		this.comercioService.get()
		.subscribe(comercios => {
			this.comercios = comercios.sort((a, b) => {
				return a.nombreComercial.localeCompare(b.nombreComercial);
			  });
			  console.log(this.comercios)
      this.comercios = comercios.filter((a) => a.estado == 'A' || a.estado == "");
      this.comercios = this.obtenerComerciosFiltrados(this.comercios);
			this.length = this.comercios.length;
		});
  }

  obtenerComerciosFiltrados(lista1: Comercio[]): Comercio[] {
    let elementosFiltrados = lista1.filter(function (elemento) {
      return elemento.cedJuridica != "1234567";
    });
    console.log(elementosFiltrados);
    return elementosFiltrados;
  }
	
	verDireccion(comercio: Comercio): void {
		this.direccionService.getBy(comercio.direccion).subscribe((dir)=>{
			dir.latitud = Number(dir.latitud);
			dir.longitud = Number(dir.longitud);
			const dialogRef = this.dialog.open(DialogDireccion, {
				maxWidth: "500px",
				data: Object.assign({
					provincias: "",
					cantones: "",
					distritos: "",
					permitir: !false
				}, dir)
			  });
		});
	}
  
}

@Pipe({
    name: 'filtrocomercios',
    pure: false
})
export class FiltroComerciosPipe implements PipeTransform {
	transform(value: any, q: string) {
        if (!q || q === '') {
          return value;
		}
		return value.filter(item => item.nombreComercial.toLowerCase().includes(q.toLowerCase()));
      }
}
