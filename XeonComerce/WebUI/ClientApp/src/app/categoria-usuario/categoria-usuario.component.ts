import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../_services/categoria.service';
import { Categoria } from '../_models/categoria'
import { CategoriaUsuario } from '../_models/categoriaUsuario'
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from './../_components/confirm-dialog/confirm-dialog.component';
import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { CategoriaUsuarioService } from './../_services/categoriaUsuario.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-usuario',
  templateUrl: './categoria-usuario.component.html',
  styleUrls: ['./categoria-usuario.component.css']
})

export class CategoriaUsuarioComponent implements OnInit {
  user: User;
  categorias: Categoria[];
  categoria: Categoria;
  categoriasPorUsuario: Categoria[];
  displayedColumns: string[] = ['id', 'valor', 'descripcion', 'eliminar'];
  datos;
  public httpClient: HttpClient;

  constructor(public dialog: MatDialog, http: HttpClient, private categoriaService: CategoriaService, private accountService: AccountService, private catUsuarioService: CategoriaUsuarioService) {
    this.user = this.accountService.userValue;
    this.httpClient = http;
  }

  ngOnInit(): void {
    this.getTodasLasCategorias();
    this.getCategorias();
  }

  getCategorias(): void {
    let catsUsuario: CategoriaUsuario[];
    let cont = 0;

    this.catUsuarioService.getByUsuario(this.user.id)
      .subscribe(categorias => {
        catsUsuario = categorias;
        for (var i = 0; i < catsUsuario.length; i++) {
          this.categoriasPorUsuario = new Array(catsUsuario.length);
          for (var j = 0; j < this.categorias.length; j++) {
            if (catsUsuario[i].idCategoria == this.categorias[j].id) {
              this.categoriasPorUsuario[cont] = this.categorias[j];
              cont++;
            }
          }
        }
        this.datos = new MatTableDataSource(this.categoriasPorUsuario);
      });
  }

  getTodasLasCategorias(): void {
    this.categoriaService.get()
      .subscribe(categorias => {
        this.categorias = categorias;
      });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.datos.filter = filtro.trim().toLowerCase();
  }

  agregarCategoria(categoria : Categoria): void{
    console.log(categoria);
    let idUsuario = this.user.id;
    console.log(this.user.id);
    let catUsuario: CategoriaUsuario;
    catUsuario = { idCategoria: categoria.id, idUsuario : idUsuario };
    this.catUsuarioService.create(catUsuario).subscribe();

    this.getCategorias();
}

  eliminar(categoria : Categoria): void {
    let categoriaUsuario: CategoriaUsuario = { idCategoria : categoria.id, idUsuario : this.user.id };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: {
        title: "¿Está seguro?",
        message: "Usted está apunto de eliminar un la categoria. "
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) this.catUsuarioService.delete(categoriaUsuario)
        .subscribe(() => {
          this.getCategorias();
        });
      this.getCategorias();
    });
  }

  eliminarTodo(): void {

  }

}
