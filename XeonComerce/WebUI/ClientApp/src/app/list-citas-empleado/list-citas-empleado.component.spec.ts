import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitasEmpleadoComponent } from './list-citas-empleado.component';

describe('ListCitasEmpleadoComponent', () => {
  let component: ListCitasEmpleadoComponent;
  let fixture: ComponentFixture<ListCitasEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCitasEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitasEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
