import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitasClienteComponent } from './list-citas-cliente.component';

describe('ListCitasClienteComponent', () => {
  let component: ListCitasClienteComponent;
  let fixture: ComponentFixture<ListCitasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCitasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
