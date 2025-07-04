import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Predmet } from '../Model/predmet';

@Injectable({
  providedIn: 'root'
})
export class RealizacijaPredmetaService {
  private baseUrl = 'http://localhost:8080/api/realizacijapredmetas';

  constructor(private http: HttpClient) {}

  getPredmetiByNastavnikId(nastavnikId: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.baseUrl}/nastavnik/${nastavnikId}`);
  }
}
