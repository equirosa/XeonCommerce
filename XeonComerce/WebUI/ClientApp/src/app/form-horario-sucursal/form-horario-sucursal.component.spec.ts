import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHorarioSucursalComponent } from './form-horario-sucursal.component';

describe('FormHorarioSucursalComponent', () => {
  let component: FormHorarioSucursalComponent;
  let fixture: ComponentFixture<FormHorarioSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHorarioSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHorarioSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
