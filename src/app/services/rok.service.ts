import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rok } from '../Model/rok';

@Injectable({
  providedIn: 'root'
})
export class RokService {
  private readonly API_URL = 'http://localhost:8080/api/roks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Rok[]> {
      return this.http.get<Rok[]>(this.API_URL);
    }
  
    getActive(): Observable<Rok[]> {
      return this.http.get<Rok[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Rok[]> {
      return this.http.get<Rok[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Rok> {
      return this.http.get<Rok>(`${this.API_URL}/${id}`);
    }
  
    create(osoba: Rok): Observable<Rok> {
      return this.http.post<Rok>(this.API_URL, osoba);
    }
  
    update(id: number, osoba: Rok): Observable<Rok> {
      return this.http.put<Rok>(`${this.API_URL}/${id}`, osoba);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
