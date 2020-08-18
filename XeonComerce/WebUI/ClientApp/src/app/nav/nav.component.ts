import { CarritoService } from './../_services/carrito.service';
import { AccountService } from '@app/_services';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Carrito } from '../_models/carrito';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  user: any;
  carrito: number;
  constructor(private accountService: AccountService, private carritoService: CarritoService) { }

  ngOnInit(): void {
	this.accountService.user.subscribe(x => {
    this.user = x;
		if(this.user.tipo == "U" || this.user.tipo == "E"){
			setInterval(()=>{
				this.carritoService.get(this.user.id).subscribe((car)=>{
					this.carrito = car.length;
				});
			}, 2000);
		}
	});
  }

  onToggleSidenav(): void { 
    this.sidenavToggle.emit();
  }

}
