import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoScannerComponent } from './info-scanner.component';

describe('InfoScannerComponent', () => {
  let component: InfoScannerComponent;
  let fixture: ComponentFixture<InfoScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
