import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentosCardComponent } from './descuentos-card.component';

describe('DescuentosCardComponent', () => {
  let component: DescuentosCardComponent;
  let fixture: ComponentFixture<DescuentosCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentosCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
