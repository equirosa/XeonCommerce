import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionDialogComponent } from './calificacion-dialog.component';

describe('CalificacionDialogComponent', () => {
  let component: CalificacionDialogComponent;
  let fixture: ComponentFixture<CalificacionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
