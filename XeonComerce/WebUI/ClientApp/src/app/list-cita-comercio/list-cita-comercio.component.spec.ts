import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitaComercioComponent } from './list-cita-comercio.component';

describe('ListCitaComercioComponent', () => {
  let component: ListCitaComercioComponent;
  let fixture: ComponentFixture<ListCitaComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCitaComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitaComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
