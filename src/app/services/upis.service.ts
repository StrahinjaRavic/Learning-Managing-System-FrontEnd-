import { Observable } from 'rxjs';
import { UpisDTO } from '../Model/DTO/upis-dto';
import { StudentNaGodini } from '../Model/studentnagodini';
import { Student } from '../Model/student';
import { GodinaStudija } from '../Model/godinastudija';
import { Osoba } from '../Model/osoba';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class UpisService {
  abstract upisiStudenta(dto: UpisDTO): Observable<StudentNaGodini>;
  abstract getSveGodineStudija(): Observable<GodinaStudija[]>;
  abstract getSviStudenti(): Observable<Student[]>;
  abstract getOsobeKojeNisuStudenti(): Observable<Osoba[]>;
}
