import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCitaServicioComponent } from './form-cita-servicio.component';

describe('FormCitaServicioComponent', () => {
  let component: FormCitaServicioComponent;
  let fixture: ComponentFixture<FormCitaServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCitaServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCitaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
