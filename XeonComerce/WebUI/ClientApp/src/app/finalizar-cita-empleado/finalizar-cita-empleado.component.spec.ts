import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarCitaEmpleadoComponent } from './finalizar-cita-empleado.component';

describe('FinalizarCitaEmpleadoComponent', () => {
  let component: FinalizarCitaEmpleadoComponent;
  let fixture: ComponentFixture<FinalizarCitaEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarCitaEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarCitaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
