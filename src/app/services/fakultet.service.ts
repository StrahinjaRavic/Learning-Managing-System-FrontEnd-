// src/app/services/fakultet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fakultet } from '../Model/fakultet';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FakultetService {
  private baseUrl = 'http://localhost:3000/fakultet'; // db.json endpoint

  constructor(private http: HttpClient) {}

  getFakultet(): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(this.baseUrl);
  }
}
