import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Nastavnik } from '../Model/nastavnik';
import { NastavnikCreateDTO } from '../Model/DTO/NastavnikCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {

  private readonly API_URL = 'http://localhost:8080/api/nastavniks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Nastavnik[]> {
      return this.http.get<Nastavnik[]>(this.API_URL);
    }
  
    getActive(): Observable<Nastavnik[]> {
      return this.http.get<Nastavnik[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Nastavnik[]> {
      return this.http.get<Nastavnik[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Nastavnik> {
      return this.http.get<Nastavnik>(`${this.API_URL}/${id}`);
    }

    getByOsobaId(id: number): Observable<Nastavnik> {
      return this.http.get<Nastavnik>(`${this.API_URL}/osoba/${id}`);
    }
  
    create(nastavnik: NastavnikCreateDTO): Observable<Nastavnik> {
      return this.http.post<Nastavnik>(this.API_URL, nastavnik);
    }
  
    update(id: number, nastavnik: Nastavnik): Observable<Nastavnik> {
      return this.http.put<Nastavnik>(`${this.API_URL}/${id}`, nastavnik);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
