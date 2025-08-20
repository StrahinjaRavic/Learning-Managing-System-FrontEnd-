import { TestBed } from '@angular/core/testing';

import { StranicaService } from './stranica.service';

describe('StranicaService', () => {
  let service: StranicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StranicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
