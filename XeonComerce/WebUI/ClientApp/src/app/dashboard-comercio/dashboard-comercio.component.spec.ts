import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComercioComponent } from './dashboard-comercio.component';

describe('DashboardComercioComponent', () => {
  let component: DashboardComercioComponent;
  let fixture: ComponentFixture<DashboardComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
