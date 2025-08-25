import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Predmet } from '../Model/predmet';
import { StudentNaPredmetu } from '../Model/studentnapredmetu';
import { RealizacijaPredmeta } from '../Model/realizacijapredmeta';

@Injectable({
  providedIn: 'root'
})
export class RealizacijaPredmetaService {
  private baseUrl = 'http://localhost:8080/api/realizacijapredmetas';

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<RealizacijaPredmeta> {
    return this.http.get<RealizacijaPredmeta>(`${this.baseUrl}/${id}`);
  }

  update(id: number, realizacija: RealizacijaPredmeta): Observable<RealizacijaPredmeta> {
    return this.http.put<RealizacijaPredmeta>(`${this.baseUrl}/${id}`, realizacija);
  }

  create(realizacija: RealizacijaPredmeta): Observable<RealizacijaPredmeta> {
    return this.http.post<RealizacijaPredmeta>(this.baseUrl, realizacija);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  restore(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/restore/${id}`, {});
  }

  getPredmetiByNastavnikId(nastavnikId: number): Observable<RealizacijaPredmeta[]> {
    return this.http.get<RealizacijaPredmeta[]>(`${this.baseUrl}/nastavnik/${nastavnikId}`);
  }

  getStudentiZaPredmet(predmetId: number): Observable<StudentNaPredmetu[]> {
    return this.http.get<StudentNaPredmetu[]>(`${this.baseUrl}/studentipredmet/${predmetId}`);
  }

  getRealizacijaByGodinaStudijaId(godinaStudijaid: number): Observable<RealizacijaPredmeta[]> {
    return this.http.get<RealizacijaPredmeta[]>(`${this.baseUrl}/godinastudija/${godinaStudijaid}`);
  }

  getRealizacijaByStudijskiProgramId(studijskiProgramId: number): Observable<RealizacijaPredmeta[]> {
    return this.http.get<RealizacijaPredmeta[]>(`${this.baseUrl}/studijskiProgram/${studijskiProgramId}`);
  }

  getActive(): Observable<RealizacijaPredmeta[]>{
    return this.http.get<RealizacijaPredmeta[]>(`${this.baseUrl}/active`);
  }
}
