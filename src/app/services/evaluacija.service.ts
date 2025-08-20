import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rok } from '../Model/rok';
import { PohadjanjePredmeta } from '../Model/pohadjanjepredmeta';
import { Observable } from 'rxjs';
import { EvaluacijaZnanja } from '../Model/evaluacijaznanja';

@Injectable({ providedIn: 'root' })
export class EvaluacijaPrijavaService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getNepolozeniPredmeti(studentId: number) {
    return this.http.get<PohadjanjePredmeta[]>(`${this.API}/pohadjanjepredmetas/active`); 
  }

  getAktivniRokovi(): Observable<Rok[]> {
    return this.http.get<Rok[]>(`${this.API}/roks/active`);
  }

  prijaviIspit(dto: any) {
    return this.http.post(`${this.API}/evaluacijaznanjas`, dto);
  }

  getByRealizacijaId(id:number): Observable<EvaluacijaZnanja[]> {
        return this.http.get<EvaluacijaZnanja[]>(`${this.API}/evaluacijaznanjas/realizacija/${id}`);
      }
}
