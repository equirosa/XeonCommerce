import { PageEvent } from '@angular/material/paginator';
import { Ubicacion } from './../../_models/ubicacion';
import { UbicacionService } from './../../_services/ubicacion.service';
import { DireccionService } from './../../_services/direccion.service';
import { Direccion } from './../../_models/direccion';
import { MensajeService } from './../../_services/mensaje.service';
import { UsuarioService } from './../../_services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../_models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: Usuario;
  direccion: Direccion;
  provincias: Ubicacion[];
  cantones: Ubicacion[];
  distritos: Ubicacion[];
  length = 0;
  pageSize = 1;
  filtro: string;
  pageEvent: PageEvent;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private mensajeService: MensajeService,
    private router: Router, private direccionService: DireccionService, private ubicacionService: UbicacionService) { }

  ngOnInit(): void {
    this.getProvincias();
    let id = this.route.snapshot.params['id'];
    this.usuarioService.getBy(id).subscribe((usuario) => {
      if (usuario != null) {
        this.usuario = usuario;
        this.direccionService.getBy(usuario.idDireccion).subscribe((direccion) => {
          if (direccion != null) {
            this.direccion = direccion;
            this.direccion.longitud = Number(this.direccion.longitud);
            this.direccion.latitud = Number(this.direccion.latitud);
            this.getCantonesE();
            this.getDistritosE();


          } else {
            this.mensajeService.add("Ha ocurrido un error");
            this.router.navigate(["/listar-usuarios"]);
          }
        });
      } else {
        this.mensajeService.add("No existe el usuario");
        this.router.navigate(["/listar-usuarios"]);
      }

      console.log(this.usuario);
    });
  }

  getProvincias(): void {
    this.ubicacionService.getProvincias()
      .subscribe(provincias => this.provincias = Object.keys(provincias).map(key => ({ value: Number(key), nombre: provincias[key] })));
  }

  getCantonesE(): void {
    let provincia = this.direccion.provincia;
    this.ubicacionService.getCantones(provincia)
      .subscribe(cantones => this.cantones = Object.keys(cantones).map(key => ({ value: Number(key), nombre: cantones[key] })));
  }

  getDistritosE(): void {
    let canton = this.direccion.canton;
    this.ubicacionService.getDistritos(this.direccion.provincia, canton)
      .subscribe(distritos => this.distritos = Object.keys(distritos).map(key => ({ value: Number(key), nombre: distritos[key] })));
  }
}
