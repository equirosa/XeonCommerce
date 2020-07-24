import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormEmpleadoComponent } from '../../components/form-empleado/form-empleado.component';

@Component({
  selector: 'app-empleado-admin',
  templateUrl: './empleado-admin.component.html',
  styleUrls: ['./empleado-admin.component.css']
})
export class EmpleadoAdminComponent implements OnInit {

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormEmpleadoComponent, {
      width: '650px',
      height: '400px',
      data: { empleado: '1' }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      console.log('aa');
    });
  }

  
}
