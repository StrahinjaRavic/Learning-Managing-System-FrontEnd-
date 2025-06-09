// src/app/services/studijski-program.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudijskiProgram } from '../Model/studijskiprogram';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudijskiProgramService {
  private baseUrl = 'http://localhost:3000/studijskiProgrami';

  constructor(private http: HttpClient) {}

  getSviProgrami(): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(this.baseUrl);
  }
   getStudijskiProgrami(): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(this.baseUrl);
  }

  getStudijskiProgramById(id: number): Observable<StudijskiProgram> {
    return this.http.get<StudijskiProgram>(`${this.baseUrl}/${id}`);
  }
  getById(id: number): Observable<StudijskiProgram> {
  return this.http.get<StudijskiProgram>(`http://localhost:3000/studijskiProgrami/${id}`);
}

}
