import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Osoba } from '../Model/osoba';
import { OsobaCreateDTO } from '../Model/DTO/OsobaCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class OsobaService {
  private readonly API_URL = 'http://localhost:8080/api/osobas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Osoba[]> {
      return this.http.get<Osoba[]>(this.API_URL);
    }
  
    getActive(): Observable<Osoba[]> {
      return this.http.get<Osoba[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Osoba[]> {
      return this.http.get<Osoba[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Osoba> {
      return this.http.get<Osoba>(`${this.API_URL}/${id}`);
    }
  
    create(osoba: OsobaCreateDTO): Observable<Osoba> {
      return this.http.post<Osoba>(this.API_URL, osoba);
    }
  
    update(id: number, osoba: Osoba): Observable<Osoba> {
      return this.http.put<Osoba>(`${this.API_URL}/${id}`, osoba);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
