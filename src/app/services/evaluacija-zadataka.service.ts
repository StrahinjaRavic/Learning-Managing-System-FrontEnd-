import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EvaluacijaZadatakaService {
  private baseUrl = 'http://localhost:8080/api/evaluacijaznanjas';

  constructor(private http: HttpClient) {}

  getEvaluacijeZaPredmet(predmetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/predmet/${predmetId}`);
  }

  dodajZadatakZaEvaluaciju(zadatak: {
    pitanje: string;
    odgovori: string[];
    evaluacijaId: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${zadatak.evaluacijaId}/zadaci`, zadatak);
  }

  getZadaciZaEvaluaciju(evaluacijaId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/zadataks/evaluacija/${evaluacijaId}`);
}

getEvaluacija(evaluacijaId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${evaluacijaId}`);
}
}
