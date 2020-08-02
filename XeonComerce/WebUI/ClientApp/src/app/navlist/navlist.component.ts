import { ComercioService } from './../_services/comercio.service';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-list',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.css']
})
export class NavlistComponent implements OnInit {

	@Output() sidenavClose = new EventEmitter();
 
	user: User;
	yaTieneComercio: boolean;

    constructor(private accountService: AccountService, private comercioService: ComercioService) {
        this.accountService.user.subscribe(x => {
			this.user = x;
			this.load();
		});
	}

  ngOnInit(): void {
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

}
