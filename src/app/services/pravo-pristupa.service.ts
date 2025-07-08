import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PravoPristupa } from '../Model/pravopristupa';

@Injectable({
  providedIn: 'root'
})
export class PravoPristupaService {
  private readonly API_URL = 'http://localhost:8080/api/pravopristupas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<PravoPristupa[]> {
      return this.http.get<PravoPristupa[]>(this.API_URL);
    }
  
    getActive(): Observable<PravoPristupa[]> {
      return this.http.get<PravoPristupa[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<PravoPristupa[]> {
      return this.http.get<PravoPristupa[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<PravoPristupa> {
      return this.http.get<PravoPristupa>(`${this.API_URL}/${id}`);
    }
  
    create(pravo: PravoPristupa): Observable<PravoPristupa> {
      return this.http.post<PravoPristupa>(this.API_URL, pravo);
    }
  
    update(id: number, pravo: PravoPristupa): Observable<PravoPristupa> {
      return this.http.put<PravoPristupa>(`${this.API_URL}/${id}`, pravo);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
