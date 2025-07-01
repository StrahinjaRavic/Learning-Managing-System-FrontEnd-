import { Injectable } from '@angular/core';
import { UpisService } from '../upis.service';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UpisDTO } from '../../Model/DTO/upis-dto';
import { StudentNaGodini } from '../../Model/studentnagodini';
import { GodinaStudija } from '../../Model/godinastudija';
import { Student } from '../../Model/student';
import { Osoba } from '../../Model/osoba';
import type { PohadjanjePredmeta } from '../../Model/pohadjanjepredmeta';

@Injectable({ providedIn: 'root' })
export class MockUpisService extends UpisService {
  private godine: GodinaStudija[] = [
  {
    id: 1,
    godina: '1',
    studijskiProgram: null!, // može ostati null ako ga ne koristiš u testu
    studentNaGodini: null!, // ⬅️ DODAJ OVO
    realizacijePredmeta: [],
    obrisano: false
  },
  {
    id: 2,
    godina: '2',
    studijskiProgram: null!,
    studentNaGodini: null!,
    realizacijePredmeta: [],
    obrisano: false
  }
];
  private studenti: Student[] = [
    {
      id: 1,
      osoba: { id: 1, ime: 'Petar', prezime: 'Petrović', jmbg: '123', adresa: null!, nastavnik: null!, student: null!, obrisano: false },
      studentNaGodini: null!,
      obrisano: false
    }
  ];

  private osobe: Osoba[] = [
    { id: 2, ime: 'Marko', prezime: 'Marković', jmbg: '456', adresa: null!, nastavnik: null!, student: null!, obrisano: false }
  ];

  upisiStudenta(dto: UpisDTO): Observable<StudentNaGodini> {
    if (!dto.godinaStudijaId || !dto.datumUpisa) {
      return throwError(() => new Error('Nedostaju podaci'));
    }

    const godina = this.godine.find(g => g.id === dto.godinaStudijaId);
    if (!godina) return throwError(() => new Error('Nepostojeća godina'));

    let student: Student;

    if (dto.osobaId) {
      const osoba = this.osobe.find(o => o.id === dto.osobaId);
      if (!osoba || !dto.brojIndeksa) return throwError(() => new Error('Podaci nisu validni'));
      student = {
        id: Math.floor(Math.random() * 10000),
        osoba,
        studentNaGodini: null!,
        obrisano: false
      };
    } else if (dto.studentId) {
      const found = this.studenti.find(s => s.id === dto.studentId);
      if (!found) return throwError(() => new Error('Student nije pronađen'));
      student = found;
    } else {
      return throwError(() => new Error('Nedovoljno podataka'));
    }

    const result: StudentNaGodini = {
      id: Math.floor(Math.random() * 10000),
      datumUpisa: dto.datumUpisa,
      brojIndeksa: null!,
      student,
      godinaStudija: godina,
      pohadjanjaPredmeta: null!,
      obrisano: false
    };

    return of(result).pipe(delay(500));
  }

  getSveGodineStudija(): Observable<GodinaStudija[]> {
    return of(this.godine);
  }

  getSviStudenti(): Observable<Student[]> {
    return of(this.studenti);
  }

  getOsobeKojeNisuStudenti(): Observable<Osoba[]> {
    return of(this.osobe);
  }
}
