import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vista } from '../_models/vista';
import { RolService } from '../_services/rol.service';
import { VistaRol } from '../_models/vista-rol';
import { ServiciosService } from '../_services/servicios.service';
import { Servicio } from '../_models/servicio';
import { Especialidad } from '../_models/especialidad';


@Component({
  selector: 'app-form-rol',
  templateUrl: './form-rol.component.html',
  styleUrls: ['./form-rol.component.css']
})
export class FormRolComponent implements OnInit {

  FormGroupRol = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Descripcion: new FormControl('', Validators.required),
    Vistas: new FormControl(),
    Especialidades: new FormControl(),
  });

  idComercio: string;
  valid = true;

  nuevaVistaRol = new VistaRol();

  servicios: Servicio[];
  serviciosEspecialidades: Servicio[]
  vistas: Vista[];
  especialidades: any[];

  constructor(  
    private rolService: RolService,
    private servicioService: ServiciosService,
    public dialogRef: MatDialogRef<FormRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar ) {
      this.rolService.getVistas().subscribe({
        next: res => {
          this.vistas = res;
        },
        error: err => console.log(err)
      });

      this.servicioService.getServicio().subscribe({
        next: res => {
          this.servicios = res.filter( s => s.idComercio === this.nuevaVistaRol.idComercio );
        },
        error: err => {
          this._snackBar.open(err, '', {
            duration: 2500
          });
        }
      });
     }

  ngOnInit(): void {
    //this.cargarServicios();

    if ( this.data.tipo === 'editar'){
      this.nuevaVistaRol = this.data.vistaRol;
      this.FormGroupRol.get('Nombre').setValue(this.nuevaVistaRol.nombre);
      this.FormGroupRol.get('Descripcion').setValue(this.nuevaVistaRol.descripcion);
      this.FormGroupRol.get('Vistas').setValue(this.nuevaVistaRol.vistas);
      this.FormGroupRol.get('Especialidades').setValue(this.nuevaVistaRol.especialidades);
      
    }

    this.idComercio = this.data.idComercio;
  }

  guardar(): void {

    if( this.nuevaVistaRol.id !== undefined){
      this.nuevaVistaRol.nombre = this.FormGroupRol.get('Nombre').value;
      this.nuevaVistaRol.descripcion = this.FormGroupRol.get('Descripcion').value;
      this.nuevaVistaRol.vistas = this.FormGroupRol.get('Vistas').value;
      this.nuevaVistaRol.especialidades = this.crearEspecialidad(this.FormGroupRol.get('Especialidades').value);
      console.log(this.FormGroupRol.get('Especialidades').value);
    } else {
      this.nuevaVistaRol.id = 0;
      this.nuevaVistaRol.idComercio = this.idComercio;
      this.nuevaVistaRol.nombre = this.FormGroupRol.get('Nombre').value;
      this.nuevaVistaRol.descripcion = this.FormGroupRol.get('Descripcion').value;
      this.nuevaVistaRol.vistas = this.FormGroupRol.get('Vistas').value;      
      this.nuevaVistaRol.especialidades = this.crearEspecialidad(this.FormGroupRol.get('Especialidades').value);
    }


    this.rolService.guardar(this.nuevaVistaRol).subscribe({
      next: res => {
        this._snackBar.open('Se ha registrado el Rol', '', {
          duration: 2500,
        });
      },
      error: err => {
        this._snackBar.open('No se logro registrar el rol', '', {
          duration: 2500,
        });
      }
    });
  }

  compararOpciones(o1: any, o2: any): boolean {
    if (o1 && o2){
      return o1.id === o2.id;
    }
  }
  
  compraraOpcionesEspecialidad(o1: any, o2: any): boolean {
    if(o1 && o2){
      return o1.id === o2.idServicio;
    }
  }

  crearEspecialidad(servicios: Servicio[]): Especialidad[] {
    
    let especialidad: Especialidad[] = new Array();

    for(let s of servicios){
      let  e = new Especialidad();
        e.id = 0,
        e.idRol = this.nuevaVistaRol.id,
        e.idServicio = s.id
        especialidad.push(e);
    }  
    return especialidad;
  }
}
