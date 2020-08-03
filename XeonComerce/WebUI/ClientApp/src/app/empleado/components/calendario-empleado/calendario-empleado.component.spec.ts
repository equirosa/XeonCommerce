import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEmpleadoComponent } from './calendario-empleado.component';

describe('CalendarioEmpleadoComponent', () => {
  let component: CalendarioEmpleadoComponent;
  let fixture: ComponentFixture<CalendarioEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
