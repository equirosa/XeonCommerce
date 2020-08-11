import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageAppComponent } from './landing-page-app.component';

describe('LandingPageAppComponent', () => {
  let component: LandingPageAppComponent;
  let fixture: ComponentFixture<LandingPageAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
