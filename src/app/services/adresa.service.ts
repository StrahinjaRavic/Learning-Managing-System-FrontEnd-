import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Adresa } from '../Model/adresa';
import { AdresaCreateDTO } from '../Model/DTO/AdresaCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class AdresaService {
  private readonly API_URL = 'http://localhost:8080/api/adresas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Adresa[]> {
      return this.http.get<Adresa[]>(this.API_URL);
    }
  
    getActive(): Observable<Adresa[]> {
      return this.http.get<Adresa[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Adresa[]> {
      return this.http.get<Adresa[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Adresa> {
      return this.http.get<Adresa>(`${this.API_URL}/${id}`);
    }
  
    create(program: AdresaCreateDTO): Observable<Adresa> {
      return this.http.post<Adresa>(this.API_URL, program);
    }
  
    update(id: number, adresa: Adresa): Observable<Adresa> {
      return this.http.put<Adresa>(`${this.API_URL}/${id}`, adresa);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
