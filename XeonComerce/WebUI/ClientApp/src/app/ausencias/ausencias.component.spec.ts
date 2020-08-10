import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciasComponent } from './ausencias.component';

describe('AusenciasComponent', () => {
  let component: AusenciasComponent;
  let fixture: ComponentFixture<AusenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
