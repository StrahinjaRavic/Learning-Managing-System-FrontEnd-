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

  getAll(): Observable<StudentNaGodini[]> {
        return this.http.get<StudentNaGodini[]>(this.baseUrl);
      }
    
      getActive(): Observable<StudentNaGodini[]> {
        return this.http.get<StudentNaGodini[]>(`${this.baseUrl}/active`);
      }

  searchText(query: string): Observable<StudentNaGodini[]> {
    return this.http.post<StudentNaGodini[]>(`${this.baseUrl}/search`, { query });
  }
  getStudentNaGodiniById(id: number): Observable<StudentNaGodini> {
    return this.http.get<StudentNaGodini>(`${this.baseUrl}/${id}`);
  }

  getStudentPregled(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/pregled`);
  }

}
