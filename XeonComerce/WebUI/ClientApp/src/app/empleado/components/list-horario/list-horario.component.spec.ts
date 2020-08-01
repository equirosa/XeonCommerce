import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHorarioComponent } from './list-horario.component';

describe('ListHorarioComponent', () => {
  let component: ListHorarioComponent;
  let fixture: ComponentFixture<ListHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
