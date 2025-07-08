import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DodeljenoPravoPristupa } from '../Model/dodeljenopravopristupa';
import { DodeljenoPravoPristupaCreateDTO } from '../Model/DTO/DodeljenoPravoPristupaCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class DodeljenoPravoPristupaService {
  private readonly API_URL = 'http://localhost:8080/api/dodeljenopravopristupas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<DodeljenoPravoPristupa[]> {
      return this.http.get<DodeljenoPravoPristupa[]>(this.API_URL);
    }
  
    getActive(): Observable<DodeljenoPravoPristupa[]> {
      return this.http.get<DodeljenoPravoPristupa[]>(`${this.API_URL}/active`);
    }

    getByKorisnikId(id: number): Observable<DodeljenoPravoPristupa[]> {
      return this.http.get<DodeljenoPravoPristupa[]>(`${this.API_URL}/korisnik/${id}`);
    }

    getByKorisnikUsername(username: String): Observable<DodeljenoPravoPristupa[]> {
      return this.http.get<DodeljenoPravoPristupa[]>(`${this.API_URL}/korisnik/${username}`);
    }
  
    getDeleted(): Observable<DodeljenoPravoPristupa[]> {
      return this.http.get<DodeljenoPravoPristupa[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<DodeljenoPravoPristupa> {
      return this.http.get<DodeljenoPravoPristupa>(`${this.API_URL}/${id}`);
    }
  
    create(pravo: DodeljenoPravoPristupaCreateDTO): Observable<DodeljenoPravoPristupa> {
      return this.http.post<DodeljenoPravoPristupa>(this.API_URL, pravo);
    }
  
    update(id: number, pravo: DodeljenoPravoPristupa): Observable<DodeljenoPravoPristupa> {
      return this.http.put<DodeljenoPravoPristupa>(`${this.API_URL}/${id}`, pravo);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
