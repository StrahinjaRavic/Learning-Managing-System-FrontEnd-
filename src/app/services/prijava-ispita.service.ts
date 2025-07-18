import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrijavaIspitaService {
  private baseUrl = 'http://localhost:8080/api/evaluacijaznanjas';

  constructor(private http: HttpClient) {}

  prijaviIspit(pohadjanjePredmetaId: number, rokId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/prijava`, {
      pohadjanjePredmetaId,
      rokId,
    });
  }

  getAktivniRok(): Observable<any> {
    return this.http.get('http://localhost:8080/api/roks/active');
  }

  getMojiPredmeti(studentNaGodiniId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/api/pohadjanjepredmetas/predmeti/nepolozeni/${studentNaGodiniId}`
    );
  }
}
