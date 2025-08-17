import { TestBed } from '@angular/core/testing';

import { UlogovaniKorisnikService } from './ulogovani-korisnik.service';

describe('UlogovaniKorisnikService', () => {
  let service: UlogovaniKorisnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlogovaniKorisnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
