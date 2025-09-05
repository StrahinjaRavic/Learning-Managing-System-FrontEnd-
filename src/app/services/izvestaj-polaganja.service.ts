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
  realizacijaPredmetaId: number;
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

  getIzvestaj(rokId: number, realizacijaPredmetaId: number): Observable<IzvestajDTO> {
    const params = new HttpParams()
      .set('rokId', rokId)
      .set('realizacijaPredmetaId', realizacijaPredmetaId);
    return this.http.get<IzvestajDTO>(this.baseUrl, { params });
  }

  getIzvestajZaDownload(rokId: number, realizacijaPredmetaId: number): Observable<Blob> {
    const url = `http://localhost:8080/api/izvestaj/pdf?rokId=${rokId}&realizacijaId=${realizacijaPredmetaId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  sendMail(rokId: number, realizacijaPredmetaId: number): Observable<any> {
    console.log(realizacijaPredmetaId)
  const params = new HttpParams()
    .set('rokId', rokId)
    .set('realizacijaId', realizacijaPredmetaId);
  return this.http.post(`http://localhost:8080/api/izvestaj/send-pdf`, null, { params });
}


  getRokovi() { return this.http.get<any[]>('http://localhost:8080/api/roks'); }
  getRealizacije() { return this.http.get<any[]>('http://localhost:8080/api/realizacijapredmetas'); }
}
