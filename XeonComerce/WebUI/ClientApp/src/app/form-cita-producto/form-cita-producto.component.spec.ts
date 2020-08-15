import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCitaProductoComponent } from './form-cita-producto.component';

describe('FormCitaProductoComponent', () => {
  let component: FormCitaProductoComponent;
  let fixture: ComponentFixture<FormCitaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCitaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCitaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
