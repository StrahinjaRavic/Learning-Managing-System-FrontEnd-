import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Odgovor } from '../Model/odgovor';
import { EvaluacijaZnanja } from '../Model/evaluacijaznanja';
import { EvaluacijaZnanjaCreateDTO } from '../Model/DTO/EvaluacijaZnanjaCreateDTO';

@Injectable()
export class EvaluacijaZadatakaService {
  private baseUrl = 'http://localhost:8080/api/evaluacijaznanjas';

  constructor(private http: HttpClient) {}

  getEvaluacijeZaPredmet(predmetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/predmet/${predmetId}`);
  }

  dodajZadatakZaEvaluaciju(zadatak: {
    pitanje: string;
    odgovori: Odgovor[];
    evaluacijaId: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${zadatak.evaluacijaId}/zadaci`, zadatak);
  }

  create(evaluacija: EvaluacijaZnanjaCreateDTO): Observable<EvaluacijaZnanja> {
        return this.http.post<EvaluacijaZnanja>(this.baseUrl, evaluacija);
  }

  getZadaciZaEvaluaciju(evaluacijaId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/zadataks/evaluacija/${evaluacijaId}`);
  }

getEvaluacija(evaluacijaId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${evaluacijaId}`);
}
}
