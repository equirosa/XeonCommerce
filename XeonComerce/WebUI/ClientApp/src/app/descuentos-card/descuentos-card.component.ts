import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Promocion } from '../_models/productoServicio';
import { PromocionService } from '../_services/promocion.service';
import { MensajeService } from '../_services/mensaje.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPromocion } from '../descuentos/descuentos.component';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-descuentos-card',
  templateUrl: './descuentos-card.component.html',
  styleUrls: ['./descuentos-card.component.css']
})
export class DescuentosCardComponent implements OnInit {

  promociones = new MatTableDataSource<Promocion>();
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
      .subscribe({
        next: res => {
          this.promociones.data = res;
        },
        error: err => console.log(err)
      });
  }

}

