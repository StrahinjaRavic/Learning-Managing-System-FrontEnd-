import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mesto } from '../Model/mesto';

@Injectable({
  providedIn: 'root'
})
export class MestoService {
private readonly API_URL = 'http://localhost:8080/api/mestos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Mesto[]> {
      return this.http.get<Mesto[]>(this.API_URL);
    }
  
    getActive(): Observable<Mesto[]> {
      return this.http.get<Mesto[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Mesto[]> {
      return this.http.get<Mesto[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Mesto> {
      return this.http.get<Mesto>(`${this.API_URL}/${id}`);
    }
  
    create(program: Mesto): Observable<Mesto> {
      return this.http.post<Mesto>(this.API_URL, program);
    }
  
    update(id: number, program: Mesto): Observable<Mesto> {
      return this.http.put<Mesto>(`${this.API_URL}/${id}`, program);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
