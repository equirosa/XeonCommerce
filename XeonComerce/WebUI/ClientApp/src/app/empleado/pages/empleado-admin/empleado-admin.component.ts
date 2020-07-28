import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormEmpleadoComponent } from '../../components/form-empleado/form-empleado.component';
import { EmpleadoService } from '../../../_services/empleado.service';

@Component({
  selector: 'app-empleado-admin',
  templateUrl: './empleado-admin.component.html',
  styleUrls: ['./empleado-admin.component.css']
})
export class EmpleadoAdminComponent implements OnInit {

  actualizarDatos = false;

  constructor( public dialog: MatDialog, private empleadoService: EmpleadoService ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormEmpleadoComponent, {
      width: '750px',
      height: '400px',
      data: { empleado: '1' }
    });

    dialogRef.afterClosed().subscribe( result => {
      this.actualizarDatos = true;
    });
  }
}
