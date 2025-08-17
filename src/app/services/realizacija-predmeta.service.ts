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

  getPredmetiByNastavnikId(nastavnikId: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.baseUrl}/nastavnik/${nastavnikId}`);
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
