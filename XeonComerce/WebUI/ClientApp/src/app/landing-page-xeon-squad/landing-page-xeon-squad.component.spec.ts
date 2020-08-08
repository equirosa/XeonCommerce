import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageXeonSquadComponent } from './landing-page-xeon-squad.component';

describe('LandingPageXeonSquadComponent', () => {
  let component: LandingPageXeonSquadComponent;
  let fixture: ComponentFixture<LandingPageXeonSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageXeonSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageXeonSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
