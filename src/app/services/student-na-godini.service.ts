import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentNaGodini } from '../Model/studentnagodini';

@Injectable({
  providedIn: 'root'
})
export class StudentNaGodiniService {
  private baseUrl = 'http://localhost:8080/api/studentnagodinis';

  constructor(private http: HttpClient) {}

searchText(query: string): Observable<StudentNaGodini[]> {
  return this.http.post<StudentNaGodini[]>(`${this.baseUrl}/search`, { query });
}
getStudentNaGodiniById(id: number): Observable<StudentNaGodini> {
  return this.http.get<StudentNaGodini>(`${this.baseUrl}/${id}`);
}
}
