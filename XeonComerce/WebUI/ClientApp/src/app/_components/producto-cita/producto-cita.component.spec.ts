import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCitaComponent } from './producto-cita.component';

describe('ProductoCitaComponent', () => {
  let component: ProductoCitaComponent;
  let fixture: ComponentFixture<ProductoCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
