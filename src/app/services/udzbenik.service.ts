import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Udzbenik } from '../Model/udzbenik';


@Injectable({
  providedIn: 'root'
})
export class UdzbenikService {
  private apiUrl = 'http://localhost:8080/api/udzbeniks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Udzbenik[]> {
    return this.http.get<Udzbenik[]>(this.apiUrl);
  }

  create(udzbenik: Udzbenik): Observable<Udzbenik> {
    return this.http.post<Udzbenik>(this.apiUrl, udzbenik);
  }

  update(id: number, udzbenik: Udzbenik): Observable<Udzbenik> {
    return this.http.put<Udzbenik>(`${this.apiUrl}/${id}`, udzbenik);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
