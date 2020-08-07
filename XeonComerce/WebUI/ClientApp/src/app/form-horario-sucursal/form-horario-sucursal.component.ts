import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sucursal } from '../_models/sucursal';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-horario-sucursal',
  templateUrl: './form-horario-sucursal.component.html',
  styleUrls: ['./form-horario-sucursal.component.css']
})
export class FormHorarioSucursalComponent implements OnInit {

  formArray: FormGroup[];

  FormGroupLunes = new FormGroup({
    HoraInicio: new FormControl('',Validators.required),
    HoraFinal: new FormControl('',Validators.required)
  });
  FormGroupMartes = new FormGroup({
    HoraInicio: new FormControl('',Validators.required),
    HoraFinal: new FormControl('',Validators.required)
  });
  FormGroupMiercoles = new FormGroup({
    HoraInicio: new FormControl('',Validators.required),
    HoraFinal: new FormControl('',Validators.required)
  });
  FormGroupJueves = new FormGroup({
    HoraInicio: new FormControl('',Validators.required),
    HoraFinal: new FormControl('',Validators.required)
  });
  FormGroupViernes = new FormGroup({
    HoraInicio: new FormControl('',Validators.required),
    HoraFinal: new FormControl('',Validators.required)
  });
  FormGroupSabado = new FormGroup({
    HoraInicio: new FormControl('',Validators.required),
    HoraFinal: new FormControl('',Validators.required)
  });
  FormGroupDomingo = new FormGroup({
    HoraInicio: new FormControl('',Validators.required),
    HoraFinal: new FormControl('',Validators.required)
  });

  FormHorario = new FormGroup({
    LunesHoraInicio: new FormControl('', Validators.required),
    LunesHoraFinal: new FormControl('', Validators.required),
    MartesHoraInicio: new FormControl('', Validators.required),
    MartesHoraFinal: new FormControl('', Validators.required),
    MiercolesHoraInicio: new FormControl('', Validators.required),
    MiercolesHoraFinal: new FormControl('', Validators.required),
    JuevesHoraInicio: new FormControl('', Validators.required),
    JuevesHoraFinal: new FormControl('', Validators.required),
    ViernesHoraInicio: new FormControl('', Validators.required),
    ViernesHoraFinal: new FormControl('', Validators.required),
    SabadoHoraInicio: new FormControl('', Validators.required),
    SabadoHoraFinal: new FormControl('', Validators.required),
    DomingoHoraInicio: new FormControl('', Validators.required),
    DomingoHoraFinal: new FormControl('', Validators.required)
  });


  sucursal: Sucursal;

  constructor( 
    public dialogRef: MatDialogRef<FormHorarioSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sucursal = this.data.sucursal;
  

  }

  guardar(): void {
    
    
  }
}
