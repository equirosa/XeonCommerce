import { ComercioService } from './comercio.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { EmpleadoService } from './empleado.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private empleadoService: EmpleadoService,
        private comercioService: ComercioService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, clave) {
        return this.http.post<User>(`${environment.apiUrl}/auth/authenticate`, { email, clave })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(user.tipo == "C"){
                this.comercioService.get().subscribe((comercios)=>{
                    
                    let comercio = comercios.find((i)=>i.idUsuario==user.id);
                    if(comercio){ 
						if(comercio.estado == "P" || comercio.estado == "R") return;
						user = Object.assign(user, {"comercio": comercio});
					}
                    else
                    console.log("No se encontró el comercio de dicho usuario.")
                    localStorage.setItem('user', JSON.stringify(user));
                    
                });
            }else if(user.tipo == "E") {
                this.empleadoService.get().subscribe({
                    next: res => {
                        let empleado = res.find( (e) => e.idUsuario === user.id && e.estado === 'A' );
                        if(empleado) user = Object.assign(user, {"empleado": empleado});
                        else 
                        console.log('No se encontró el comercio de dicho empleado.')
                        localStorage.setItem('user', JSON.stringify(user));
                        this.userSubject.next(user);

                    },
                    error: err => console.log(err)
                });

            }else{
                localStorage.setItem('user', JSON.stringify(user));
            }

            this.userSubject.next(user);
            return user;
        }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/cuenta/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/usuario/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/usuario`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/usuario/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/usuario/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/usuario/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }


}
