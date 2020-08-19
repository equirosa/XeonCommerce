import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarNuevoProductoComponent } from './finalizar-nuevo-producto.component';

describe('FinalizarNuevoProductoComponent', () => {
  let component: FinalizarNuevoProductoComponent;
  let fixture: ComponentFixture<FinalizarNuevoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarNuevoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarNuevoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
