import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Izdavanje } from '../Model/izdavanje';
import { IzdavanjeCreateDTO } from '../Model/DTO/izdavanjeCreateDTO';


@Injectable({
  providedIn: 'root'
})
export class IzdavanjeService {
  private apiUrl = 'http://localhost:8080/api/izdavanjas';

  constructor(private http: HttpClient) {}

  create(izdavanje: IzdavanjeCreateDTO): Observable<Izdavanje> {
    return this.http.post<Izdavanje>(this.apiUrl, izdavanje);
  }

  getAll(): Observable<Izdavanje[]> {
    return this.http.get<Izdavanje[]>(this.apiUrl);
  }
}
