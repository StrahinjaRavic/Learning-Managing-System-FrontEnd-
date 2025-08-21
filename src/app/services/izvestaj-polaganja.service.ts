import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IzvestajRow {
  polaganjeId: number;
  datum: string;
  student: string;
  indeks: string;
  bodovi: number | null;
  ocena: number;
}

export interface IzvestajDTO {
  rokId: number;
  predmetId: number;
  rokNaziv: string;
  predmetNaziv: string;
  histogram: { [ocena: string]: number };
  brojPrijava: number;
  prosekBodova: number | null;
  minBodovi: number | null;
  maxBodovi: number | null;
  rezultati: IzvestajRow[];
}

@Injectable({ providedIn: 'root' })
export class IzvestajPolaganjaService {
  private baseUrl = 'http://localhost:8080/api/izvestaji/polaganja';

  constructor(private http: HttpClient) {}

  getIzvestaj(rokId: number, predmetId: number): Observable<IzvestajDTO> {
    const params = new HttpParams()
      .set('rokId', rokId)
      .set('predmetId', predmetId);
    return this.http.get<IzvestajDTO>(this.baseUrl, { params });
  }

  generatePdf(rokId: number, predmetId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf/${rokId}/${predmetId}`, { responseType: 'blob' });
  }

  /**
   * Pošalji izveštaj mejlom nastavnicima angažovanim na predmetu
   */
  sendMail(rokId: number, predmetId: number): Observable<any> {
    const params = new HttpParams()
      .set('rokId', rokId)
      .set('predmetId', predmetId);
      console.log(rokId, predmetId)
    return this.http.post(`http://localhost:8080/api/izvestaj/send-pdf?rokId=${rokId}&predmetId=${predmetId}`, null, { params });
  }

  getRokovi() { return this.http.get<any[]>('http://localhost:8080/api/roks'); }
getPredmeti() { return this.http.get<any[]>('http://localhost:8080/api/predmets'); }
}
