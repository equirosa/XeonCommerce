import { TestBed } from '@angular/core/testing';

import { AusenciasService } from './ausencias.service';

describe('AusenciasService', () => {
  let service: AusenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AusenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
