import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaUsuarioComponent } from './categoria-usuario.component';

describe('CategoriaUsuarioComponent', () => {
  let component: CategoriaUsuarioComponent;
  let fixture: ComponentFixture<CategoriaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
