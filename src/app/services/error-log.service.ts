import { Injectable } from '@angular/core';
import { Katedra } from '../Model/katedra';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorLog } from '../Model/errorLog';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  private readonly API_URL = 'http://localhost:8080/api/errors';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ErrorLog[]> {
    return this.http.get<ErrorLog[]>(this.API_URL);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  
  restore(id: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
  }

  getActive(): Observable<ErrorLog[]> {
    return this.http.get<ErrorLog[]>(`${this.API_URL}/active`);
  }
}
