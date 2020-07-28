import { ComercioService } from './_services/comercio.service';
import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
	user: User;
	yaTieneComercio: boolean;

    constructor(private accountService: AccountService, private comercioService: ComercioService) {
        this.accountService.user.subscribe(x => {
			this.user = x;
			this.load();
		});
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