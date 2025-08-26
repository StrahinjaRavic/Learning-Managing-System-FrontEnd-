import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmet } from '../Model/predmet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {

  private readonly API_URL = 'http://localhost:8080/api/predmets';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Predmet[]> {
      return this.http.get<Predmet[]>(this.API_URL);
    }
  
    getActive(): Observable<Predmet[]> {
      return this.http.get<Predmet[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Predmet[]> {
      return this.http.get<Predmet[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Predmet> {
      return this.http.get<Predmet>(`${this.API_URL}/${id}`);
    }
  
    update(id: number, predmet: Predmet): Observable<Predmet> {
      return this.http.put<Predmet>(`${this.API_URL}/${id}`, predmet);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
