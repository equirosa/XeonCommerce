import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
  
	constructor(private _formBuilder: FormBuilder) {}
  
	ngOnInit() {
	  this.firstFormGroup = this._formBuilder.group({
		firstCtrl: ['', Validators.required]
	  });
	  this.secondFormGroup = this._formBuilder.group({
		secondCtrl: ['', Validators.required]
	  });
	}
}
