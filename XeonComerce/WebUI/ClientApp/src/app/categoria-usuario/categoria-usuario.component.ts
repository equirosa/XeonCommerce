import { Component, OnInit } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoriaService } from './../_services/categoria.service';
import { Categoria, CategoriaNombre} from '../_models/categoria'

@Component({
  selector: 'app-categoria-usuario',
  templateUrl: './categoria-usuario.component.html',
  styleUrls: ['./categoria-usuario.component.css']
})

export class CategoriaUsuarioComponent implements OnInit {

  categorias : Categoria[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  //fruits: Fruit[] = [
  //  { name: 'Lemon' },
  //  { name: 'Lime' },
  //  { name: 'Apple' },
  //];
  categoriasUsuario: CategoriaNombre[] = [{ valor: 'Panaderia' }, { name: 'VideoJuegos' }, { name: 'Moda' },]/*this.getCategorias();*/

  constructor(private categoriaService: CategoriaService) {

  }

  ngOnInit(): void {
  }

  getCategorias(): Categoria[] {
    this.categoriaService.get()
      .subscribe(categorias => {
        this.categorias = categorias;
        console.log(this.categorias);
      });
    return this.categorias;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our category
    if ((value || '').trim()) {
      this.categoriasUsuario.push({ valor: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(categorias: Categoria): void {
    const index = this.categoriasUsuario.indexOf(categorias);

    if (index >= 0) {
      this.categorias.splice(index, 1);
    }
  }

}
