import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sifarnik } from '../Model/sifarnik';
import { SifarnikCreateDTO } from '../Model/DTO/SifarnikCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class SifarnikService {
private readonly API_URL = 'http://localhost:8080/api/sifarniks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sifarnik[]> {
      return this.http.get<Sifarnik[]>(this.API_URL);
    }
  
    getActive(): Observable<Sifarnik[]> {
      return this.http.get<Sifarnik[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Sifarnik[]> {
      return this.http.get<Sifarnik[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Sifarnik> {
      return this.http.get<Sifarnik>(`${this.API_URL}/${id}`);
    }
  
    create(sifarnik: SifarnikCreateDTO): Observable<Sifarnik> {
      return this.http.post<Sifarnik>(this.API_URL, sifarnik);
    }
  
    update(id: number, sifarnik: Sifarnik): Observable<Sifarnik> {
      return this.http.put<Sifarnik>(`${this.API_URL}/${id}`, sifarnik);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
