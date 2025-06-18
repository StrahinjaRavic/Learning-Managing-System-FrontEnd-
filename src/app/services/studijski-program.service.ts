import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudijskiProgram } from '../Model/studijskiprogram';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudijskiProgramService {
  private readonly API_URL = 'http://localhost:8080/api/studijskiprograms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(this.API_URL);
  }

  getActive(): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(`${this.API_URL}/active`);
  }

  getDeleted(): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(`${this.API_URL}/deleted`);
  }

  getById(id: number): Observable<StudijskiProgram> {
    return this.http.get<StudijskiProgram>(`${this.API_URL}/${id}`);
  }

  create(program: StudijskiProgram): Observable<StudijskiProgram> {
    return this.http.post<StudijskiProgram>(this.API_URL, program);
  }

  update(id: number, program: StudijskiProgram): Observable<StudijskiProgram> {
    return this.http.put<StudijskiProgram>(`${this.API_URL}/${id}`, program);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  restore(id: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
  }
}
