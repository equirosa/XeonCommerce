import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarCitaDatosComponent } from './finalizar-cita-datos.component';

describe('FinalizarCitaDatosComponent', () => {
  let component: FinalizarCitaDatosComponent;
  let fixture: ComponentFixture<FinalizarCitaDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarCitaDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarCitaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
