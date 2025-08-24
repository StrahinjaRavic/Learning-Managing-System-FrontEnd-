import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Predmet } from '../Model/predmet';
import { Student } from '../Model/student';
import { StudentCreateDTO } from '../Model/DTO/StudentCreateDTO';
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
    return this.http.get<Student[]>(`${this.API_URL1}/active`);
  }

  getIdByUsername(username : string): Observable<number> {
    return this.http.get<number>(`${this.API_URL1}/idByUsername/${username}`);
  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.API_URL1);
  }

  create(student: StudentCreateDTO): Observable<Student> {
    return this.http.post<Student>(this.API_URL1, student);
  }

  delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL1}/${id}`);
  }

  restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL1}/restore/${id}`, {});
    }

  getIstorijaStudiranja(studentId: number): Observable<IstorijaStudiranjaDTO> {
  return this.http.get<IstorijaStudiranjaDTO>(`http://localhost:8080/api/students/${studentId}/istorija`);
}
}
