import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GodinaStudija } from '../Model/godinastudija';

@Injectable({
  providedIn: 'root'
})
export class GodinaStudijaService {

  private readonly API_URL = 'http://localhost:8080/api/godinastudijas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<GodinaStudija[]> {
      return this.http.get<GodinaStudija[]>(this.API_URL);
    }
  
    getActive(): Observable<GodinaStudija[]> {
      return this.http.get<GodinaStudija[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<GodinaStudija[]> {
      return this.http.get<GodinaStudija[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<GodinaStudija> {
      return this.http.get<GodinaStudija>(`${this.API_URL}/${id}`);
    }
  
    create(program: GodinaStudija): Observable<GodinaStudija> {
      return this.http.post<GodinaStudija>(this.API_URL, program);
    }
  
    update(id: number, program: GodinaStudija): Observable<GodinaStudija> {
      return this.http.put<GodinaStudija>(`${this.API_URL}/${id}`, program);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
