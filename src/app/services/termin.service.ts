import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TerminCreateDTO } from '../Model/DTO/TerminCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class TerminService {
  private readonly API_URL = 'http://localhost:8080/api/termins';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TerminCreateDTO[]> {
      return this.http.get<TerminCreateDTO[]>(this.API_URL);
    }
  
    getActive(): Observable<TerminCreateDTO[]> {
      return this.http.get<TerminCreateDTO[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<TerminCreateDTO[]> {
      return this.http.get<TerminCreateDTO[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<TerminCreateDTO> {
      return this.http.get<TerminCreateDTO>(`${this.API_URL}/${id}`);
    }
  
    create(termin: TerminCreateDTO): Observable<TerminCreateDTO> {
      return this.http.post<TerminCreateDTO>(this.API_URL, termin);
    }
  
    update(id: number, osoba: TerminCreateDTO): Observable<TerminCreateDTO> {
      return this.http.put<TerminCreateDTO>(`${this.API_URL}/${id}`, osoba);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
