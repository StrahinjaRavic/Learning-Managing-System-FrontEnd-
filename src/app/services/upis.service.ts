import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Student } from '../Model/student';  // Pretpostavljam da već postoji
import { GodinaStudija } from '../Model/godinastudija'; // Takođe pretpostavljam da već postoji

@Injectable({ providedIn: 'root' })
export class UpisService {
  private studentiUrl = 'http://localhost:8080/api/students';
  private godineStudijaUrl = 'http://localhost:8080/api/godinastudijas';

  constructor(private http: HttpClient) {}

  getStudenti(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentiUrl);
  }

  getGodineStudija(): Observable<GodinaStudija[]> {
    return this.http.get<GodinaStudija[]>(this.godineStudijaUrl);
  }

  upisiNaGodinu(studentId: number, godinaId: number): Observable<any> {
    const body = {
      studentId,
      godinaId,
      datumUpisa: new Date().toISOString() // ili neka druga logika
    };
    return this.http.post('http://localhost:8080/api/studentnagodinis', body);
  }
}
