import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Predmet } from '../Model/predmet';
import { Student } from '../Model/student';
import { IstorijaStudiranjaDTO } from '../Model/DTO/istorijastudiranjaDTO';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/pohadjanjepredmetas';
  private readonly API_URL1 = 'http://localhost:8080/api/students';

  getPredmetiZaStudentaKojeSlusa(studentId: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.API_URL}/predmeti/nepolozeni/${studentId}`);
  }

  getGotoviPredmetiZaStudenta(studentId: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.API_URL}/predmeti/polozeni/${studentId}`);
  }

  getLoggedInStudent(): Observable<Student> {
    return this.http.get<Student>(`${this.API_URL1}/me`);
  }

  getActive(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_URL}/active`);
  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.API_URL);
  }
  getIstorijaStudiranja(studentId: number): Observable<IstorijaStudiranjaDTO> {
  return this.http.get<IstorijaStudiranjaDTO>(`http://localhost:8080/api/students/${studentId}/istorija`);
}
}
