import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ProductoServicio } from '../_models/productoServicio';
import { PromocionService } from '../_services/promocion.service';
import { MensajeService } from '../_services/mensaje.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPromocion } from '../descuentos/descuentos.component';
import { PageEvent } from '@angular/material/paginator';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-descuentos-card',
  templateUrl: './descuentos-card.component.html',
  styleUrls: ['./descuentos-card.component.css']
})
export class DescuentosCardComponent implements OnInit {

  promociones: ProductoServicio[];
  length;
  pageSize = 5;
  filtro: string;
  pageEvent: PageEvent;

  constructor(public dialog: MatDialog, private promocionService: PromocionService, private mensajeService: MensajeService) { }

  ngOnInit(): void {
    this.getPromociones();
  }

  getPromociones(): void {
    this.promocionService.get()
      .subscribe(promociones => {
        this.promociones = promociones.sort((a, b) => {
          return a.nombre.localeCompare(b.nombre);
        });
        console.log(this.promociones)
        this.promociones = promociones.filter((a) => a.estado == 'A' || a.estado == "");
        this.length = this.promociones.length;
      });
  }

}

@Pipe({
  name: 'filtropromociones',
  pure: false
})
export class FiltroPromocionesPipe implements PipeTransform {
  transform(value: any, q: string) {
    if (!q || q === '') {
      return value;
    }
    return value.filter(item => item.nombre.toLowerCase().includes(q.toLowerCase()));
  }
}
