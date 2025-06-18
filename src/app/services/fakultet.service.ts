import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fakultet } from '../Model/fakultet';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FakultetService {
  private baseUrl = 'http://localhost:8080/api/fakultets';

  constructor(private http: HttpClient) {}

  getFakultet(): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(this.baseUrl);
  }

  // Po potrebi možeš dodati i ove:
  getActive(): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(`${this.baseUrl}/active`);
  }

  getDeleted(): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(`${this.baseUrl}/deleted`);
  }
}
