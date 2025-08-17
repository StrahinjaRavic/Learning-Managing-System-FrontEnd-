import { Injectable } from '@angular/core';
import { PolaganjeCreateDTO } from '../Model/DTO/PolaganjeCreateDTO';
import { Polaganje } from '../Model/polaganje';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolaganjeService {
  private readonly API_URL = 'http://localhost:8080/api/polaganjes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Polaganje[]> {
      return this.http.get<Polaganje[]>(this.API_URL);
    }
  
    getActive(): Observable<Polaganje[]> {
      return this.http.get<Polaganje[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Polaganje[]> {
      return this.http.get<Polaganje[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Polaganje> {
      return this.http.get<Polaganje>(`${this.API_URL}/${id}`);
    }
  
    create(polaganje: PolaganjeCreateDTO): Observable<Polaganje> {
      return this.http.post<Polaganje>(this.API_URL, polaganje);
    }
  
    update(id: number, polaganje: Polaganje): Observable<Polaganje> {
      return this.http.put<Polaganje>(`${this.API_URL}/${id}`, polaganje);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
