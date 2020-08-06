import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { Usuario } from '../_models/usuario';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  title = 'app';
  widthPorcentajeCitasRealizadas: number = 5;
  usuarios: Usuario[];
  usuariosCount: number;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.get().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.usuariosCount = this.usuarios.length;
    });
  }
}
