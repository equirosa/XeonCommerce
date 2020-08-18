import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarCitaProductosComponent } from './finalizar-cita-productos.component';

describe('FinalizarCitaProductosComponent', () => {
  let component: FinalizarCitaProductosComponent;
  let fixture: ComponentFixture<FinalizarCitaProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarCitaProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarCitaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
