import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoHorarioComponent } from './empleado-horario.component';

describe('EmpleadoHorarioComponent', () => {
  let component: EmpleadoHorarioComponent;
  let fixture: ComponentFixture<EmpleadoHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
