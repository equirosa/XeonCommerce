import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioCliente } from './../_models/usuario';
import { MensajeService } from '../_services/mensaje.service';
import { UsuarioService } from './../_services/usuario.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  usuario: UsuarioCliente;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private mensajeService: MensajeService,
    ) { }

  ngOnInit(): void {
    this.usuario = new UsuarioCliente();
  }

  guardarActualizacion(): void {
    if (!this.formularioCompleto(this.data)) {
      this.mensajeService.add("¡Favor llene todos los datos!");
      return;
    }
    this.usuario.id = this.data.id;
    this.usuario.nombre = this.data.nombre;
    this.usuario.apellidoUno = this.data.apellidoUno;
    this.usuario.apellidoDos = this.data.apellidoDos;
    this.usuario.genero = this.data.genero;
    this.usuario.fechaNacimiento = this.data.fechaNacimiento;
    this.usuario.correoElectronico = this.data.correoElectronico;
    this.usuario.numeroTelefono = this.data.numeroTelefono;
    this.usuario.idDireccion = this.data.idDireccion;
    this.usuario.estado = this.data.estado;
    this.usuario.codigo = this.data.codigo;
    this.usuario.tipo = this.data.tipo;
    console.log(this.usuario);
    this.usuarioService.update(this.usuario).subscribe(() => {
    });
  }

  formularioCompleto(us) {
    let formularioCompleto = true;
    if (us.nombre == "" || us.apellidoUno == "" || us.apellidoDos == "" || us.correoElectronico == "" || us.numeroTelefono == "") {
      formularioCompleto = false;
    }
    return formularioCompleto;
  }

}
