import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IstorijaStudiranjaService {
  private istorijaStudiranja: {
    [studentId: number]: {
      predmet: string;
      brojPolaganja: number;
      bodovi: number;
      ocena: number;
      espb: number;
    }[];
  } = {
    1: [
      {
        predmet: 'Matematika 1',
        brojPolaganja: 2,
        bodovi: 85,
        ocena: 9,
        espb: 6,
      },
      {
        predmet: 'Programiranje',
        brojPolaganja: 1,
        bodovi: 92,
        ocena: 10,
        espb: 8,
      },
    ],
    2: [
      {
        predmet: 'Fizika',
        brojPolaganja: 3,
        bodovi: 78,
        ocena: 8,
        espb: 7,
      },
    ],
  };

  constructor() {}

  getIstorijaStudiranja(studentId: number): Observable<{
    predmet: string;
    brojPolaganja: number;
    bodovi: number;
    ocena: number;
    espb: number;
  }[]> {
    return of(this.istorijaStudiranja[studentId] || []);
  }
}
