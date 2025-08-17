import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PohadjanjePredmeta } from '../Model/pohadjanjepredmeta';
import { Predmet } from '../Model/predmet';

@Injectable({
  providedIn: 'root'
})
export class PohadjanjePredmetaService {

  private readonly API_URL = 'http://localhost:8080/api/pohadjanjepredmetas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<PohadjanjePredmeta[]> {
      return this.http.get<PohadjanjePredmeta[]>(this.API_URL);
    }
  
    getActive(): Observable<PohadjanjePredmeta[]> {
      return this.http.get<PohadjanjePredmeta[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<PohadjanjePredmeta[]> {
      return this.http.get<PohadjanjePredmeta[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<PohadjanjePredmeta> {
      return this.http.get<PohadjanjePredmeta>(`${this.API_URL}/${id}`);
    }
  
    create(pohadjanje: PohadjanjePredmeta): Observable<PohadjanjePredmeta> {
      return this.http.post<PohadjanjePredmeta>(this.API_URL, pohadjanje);
    }
  
    update(id: number, pohadjanje: PohadjanjePredmeta): Observable<PohadjanjePredmeta> {
      return this.http.put<PohadjanjePredmeta>(`${this.API_URL}/${id}`, pohadjanje);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }

    getPolozeniPredmetiByStudentId(studentId: number): Observable<Predmet[]> {
      return this.http.get<Predmet[]>(`${this.API_URL}/predmeti/polozeni/${studentId}`, {});
    }
}
