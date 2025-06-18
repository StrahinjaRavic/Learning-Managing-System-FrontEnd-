import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Predmet } from '../Model/predmet';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/pohadjanjepredmetas';

  getPredmetiZaStudentaKojeSlusa(studentId: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.API_URL}/predmeti/${studentId}`);
  }
}
