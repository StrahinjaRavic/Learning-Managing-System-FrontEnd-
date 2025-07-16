import { TestBed } from '@angular/core/testing';

import { OsobaService } from './osoba.service';

describe('OsobaService', () => {
  let service: OsobaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsobaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
