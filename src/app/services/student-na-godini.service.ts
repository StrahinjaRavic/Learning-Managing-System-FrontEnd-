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

  search(ime?: string, prezime?: string, brojIndeksa?: number, godinaUpisa?: number): Observable<StudentNaGodini[]> {
  // Pretvori prazne stringove u null ili undefined da bi backend mogao da filtrira
  const body = {
    ime: ime?.trim() || null,
    prezime: prezime?.trim() || null,
    brojIndeksa: brojIndeksa ?? null,
    godinaUpisa: godinaUpisa ?? null
  };
  
  return this.http.post<StudentNaGodini[]>(`${this.baseUrl}/search`, body);
}
}
