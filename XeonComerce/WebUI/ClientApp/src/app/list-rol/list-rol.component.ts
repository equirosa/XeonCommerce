import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { VistaRol } from '../_models/vista-rol';
import { MatTableDataSource } from '@angular/material/table';
import { RolService } from '../_services/rol.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormRolComponent } from '../form-rol/form-rol.component';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.css']
})
export class ListRolComponent implements OnInit {

  roles = new MatTableDataSource<VistaRol>();
  columnas: string[] = ['nombre', 'descripcion', 'editar', 'eliminar'];

  @Input()
  idComercio: string;

  @Input()
  actualizarDatos: boolean;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roles.filter = filterValue.trim().toLowerCase();
  }
  
  constructor( private rolService: RolService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  ngOnChanges(changes: SimpleChanges){
    this.cargarRoles();
    // if( changes.idComercio.previousValue !== this)
  }


  cargarRoles(): void {
    this.rolService.getRoles(this.idComercio).subscribe({
      next: res => {
        this.roles.data = res;
      },
      error: err => console.log(err)
    });
  }


  editar(vistaRol): void {
    const dialogRef = this.dialog.open(FormRolComponent, {
      width: '400px',
      height: '500px',
      data: {tipo: 'editar', vistaRol, idComercio: vistaRol.idComercio}
    });

    dialogRef.afterClosed().subscribe( result => {
      this.cargarRoles();
    });
  }

  eliminar(vistaRol): void {
    this.rolService.delete(vistaRol).subscribe({
      next: res => {
        this.cargarRoles();
        this._snackBar.open('Se ha eliminado el Rol', '', {
          duration: 2500,
        });
      },
      error: err => console.log(err)
    });
  }

}
