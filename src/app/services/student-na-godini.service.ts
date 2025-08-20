import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentNaGodini } from '../Model/studentnagodini';
import { StudentNaGodiniCreateDTO } from '../Model/DTO/StudentNaGodiniCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentNaGodiniService {
  private API_URL = 'http://localhost:8080/api/studentnagodinis';

  constructor(private http: HttpClient) {}

  search(ime?: string, prezime?: string, brojIndeksa?: number, godinaUpisa?: number): Observable<StudentNaGodini[]> {
    // Pretvori prazne stringove u null ili undefined da bi backend mogao da filtrira
    const body = {
      ime: ime?.trim() || null,
      prezime: prezime?.trim() || null,
      brojIndeksa: brojIndeksa ?? null,
      godinaUpisa: godinaUpisa ?? null
    };
    
    return this.http.post<StudentNaGodini[]>(`${this.API_URL}/search`, body);
  }
  getAll(): Observable<StudentNaGodini[]> {
        return this.http.get<StudentNaGodini[]>(this.API_URL);
      }
    
      getActive(): Observable<StudentNaGodini[]> {
        return this.http.get<StudentNaGodini[]>(`${this.API_URL}/active`);
      }
    
      getDeleted(): Observable<StudentNaGodini[]> {
        return this.http.get<StudentNaGodini[]>(`${this.API_URL}/deleted`);
      }
    
      getById(id: number): Observable<StudentNaGodini> {
        return this.http.get<StudentNaGodini>(`${this.API_URL}/${id}`);
      }

      getByStudentId(id: number): Observable<StudentNaGodini[]> {
        return this.http.get<StudentNaGodini[]>(`${this.API_URL}/student/${id}`);
      }
    
      create(nastavnik: StudentNaGodiniCreateDTO): Observable<StudentNaGodini> {
        return this.http.post<StudentNaGodini>(this.API_URL, nastavnik);
      }
    
      update(id: number, nastavnik: StudentNaGodini): Observable<StudentNaGodini> {
        return this.http.put<StudentNaGodini>(`${this.API_URL}/${id}`, nastavnik);
      }
    
      delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
      }
    
      restore(id: number): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
      }

      searchText(query: string): Observable<StudentNaGodini[]> {
        return this.http.post<StudentNaGodini[]>(`${this.API_URL}/search`, { query });
      }

      getStudentNaGodiniById(id: number): Observable<StudentNaGodini> {
        return this.http.get<StudentNaGodini>(`${this.API_URL}/${id}`);
      }

      getStudentPregled(id: number): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/${id}/pregled`);
      }

}
