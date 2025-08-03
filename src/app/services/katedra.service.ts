import { Injectable } from '@angular/core';
import { Katedra } from '../Model/katedra';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KatedraService {

  private readonly API_URL = 'http://localhost:8080/api/katedras';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Katedra[]> {
      return this.http.get<Katedra[]>(this.API_URL);
    }
  
    getActive(): Observable<Katedra[]> {
      return this.http.get<Katedra[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Katedra[]> {
      return this.http.get<Katedra[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Katedra> {
      return this.http.get<Katedra>(`${this.API_URL}/${id}`);
    }
  
    create(program: Katedra): Observable<Katedra> {
      return this.http.post<Katedra>(this.API_URL, program);
    }
  
    update(id: number, program: Katedra): Observable<Katedra> {
      return this.http.put<Katedra>(`${this.API_URL}/${id}`, program);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    getByFakultetId(id: number): Observable<Katedra[]> {
      return this.http.get<Katedra[]>(`${this.API_URL}/fakultet/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
