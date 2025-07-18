import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Termin } from '../Model/termin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminService {
  private baseUrl = 'http://localhost:8080/api/termins';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Termin[]> {
    return this.http.get<Termin[]>(`${this.baseUrl}/active`);
  }

  getByPredmet(predmetId: number): Observable<Termin[]> {
    return this.http.get<Termin[]>(`${this.baseUrl}/predmet/${predmetId}`);
  }

  create(termin: Termin): Observable<Termin> {
    return this.http.post<Termin>(this.baseUrl, termin);
  }

  update(id: number, termin: Termin): Observable<Termin> {
    return this.http.put<Termin>(`${this.baseUrl}/${id}`, termin);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

   getTerminiByPredmet(predmetId: number): Observable<Termin[]> {
    return this.http.get<Termin[]>(`${this.baseUrl}/predmet/${predmetId}`);
  }

  updateTermin(termin: Termin): Observable<Termin> {
  const dto = {
    id: termin.id,
    datum: termin.datum,
    vremePocetka: termin.vremePocetka,
    vremeKraja: termin.vremeKraja,
    ishod: termin.ishod,
    realizacijaPredmetaId: termin.realizacijaPredmeta_id
  };
  console.log(dto.realizacijaPredmetaId)
  return this.http.put<Termin>(`${this.baseUrl}/${termin.id}`, dto);
}

}
