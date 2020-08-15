import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeseosComponent } from './lista-deseos.component';

describe('ListaDeseosComponent', () => {
  let component: ListaDeseosComponent;
  let fixture: ComponentFixture<ListaDeseosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeseosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeseosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
