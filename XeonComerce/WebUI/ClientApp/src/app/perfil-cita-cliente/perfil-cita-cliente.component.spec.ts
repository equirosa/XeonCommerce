import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCitaClienteComponent } from './perfil-cita-cliente.component';

describe('PerfilCitaClienteComponent', () => {
  let component: PerfilCitaClienteComponent;
  let fixture: ComponentFixture<PerfilCitaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilCitaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCitaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
