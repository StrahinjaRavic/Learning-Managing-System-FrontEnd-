import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stranica } from '../Model/stranica';
import { Observable } from 'rxjs';
import { StranicaCreateDTO } from '../Model/DTO/StranicaCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class StranicaService {

  private apiUrl = 'http://localhost:8080/api/stranice';

  constructor(private http: HttpClient) { }

  getByUdzbenikId(udzbenikId: number): Observable<Stranica[]> {
    return this.http.get<Stranica[]>(`${this.apiUrl}/byUdzbenik/${udzbenikId}`);
  }

  getById(id: number): Observable<Stranica> {
    return this.http.get<Stranica>(`${this.apiUrl}/${id}`);
  }

  create(stranica: StranicaCreateDTO): Observable<Stranica> {
    return this.http.post<Stranica>(this.apiUrl, stranica);
  }
}
