import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercioRolComponent } from './comercio-rol.component';

describe('ComercioRolComponent', () => {
  let component: ComercioRolComponent;
  let fixture: ComponentFixture<ComercioRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComercioRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercioRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
