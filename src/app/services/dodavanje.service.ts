import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dodavanje } from '../Model/dodavanje';
import { DodavanjeCreateDTO } from '../Model/DTO/dodavanjeCreateDTO';


@Injectable({
  providedIn: 'root'
})
export class DodavanjeService {
  private apiUrl = 'http://localhost:8080/api/dopunjavanjas';

  constructor(private http: HttpClient) {}

  create(dodavanje: DodavanjeCreateDTO): Observable<Dodavanje> {
  return this.http.post<Dodavanje>(this.apiUrl, dodavanje);
}


  getAll(): Observable<Dodavanje[]> {
    return this.http.get<Dodavanje[]>(this.apiUrl);
  }
}
