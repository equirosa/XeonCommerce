import { ComercioService } from './../_services/comercio.service';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Vista } from '../_models/vista';
import { RolService } from '../_services/rol.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.css']
})
export class NavlistComponent implements OnInit {

	@Output() sidenavClose = new EventEmitter();
 
	user: any;
	yaTieneComercio: boolean;
	vistasEmpleado: Vista[];
	tieneVistas = false;

    constructor(private accountService: AccountService, private comercioService: ComercioService, private rolService: RolService) {
        this.accountService.user.subscribe(x => {
			this.user = x;
			this.load();
			if( this.user && this.user.tipo === 'E' && this.user.empleado){
				this.cargarVistasEmpleado();
			}
		});
		
	}

  ngOnInit(): void {
	if( this.user && this.user.tipo === 'E'){
		this.cargarVistasEmpleado();
	}
  }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  
  logout() {
	this.accountService.logout();
}

load(): void{
	if(this.user){
		this.comercioService.get().subscribe((comercios)=>{
			
			let usr = comercios.find(c=>c.idUsuario == this.user.id);
			if(usr){
				this.yaTieneComercio = false;
			}else{
				this.yaTieneComercio = true;
			}
		});
	}
}

cargarVistasEmpleado(): void {
	let rol = JSON.parse(localStorage.getItem('user')).empleado.idRol;
	this.rolService.getRol(rol).subscribe({
		next: res => {
			this.vistasEmpleado = res.vistas;
			this.ngOnInit();
			this.tieneVistas = true; 
			
		},
		error: err => console.log(err)
	});
	
}

}
