import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoComercioComponent } from './empleado-comercio.component';

describe('EmpleadoComercioComponent', () => {
  let component: EmpleadoComercioComponent;
  let fixture: ComponentFixture<EmpleadoComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
