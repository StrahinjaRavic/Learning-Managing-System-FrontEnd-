import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Predmet } from '../Model/predmet';
import { PrijavaPolaganja } from '../Model/prijavapolaganja';
import { Observable } from 'rxjs';
import { Polaganje } from '../Model/polaganje';

@Injectable({
  providedIn: 'root'
})
export class PrijavaPolaganjaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getNepolozeniPredmeti(studentId: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.apiUrl}/pohadjanjepredmetas/predmeti/nepolozeni/${studentId}`);
  }

  prijaviIspit(studentId: number, polaganjeId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/prijavapolaganjas/student/${studentId}/prijava/${polaganjeId}`, {});
  }

  getDostupnaPolaganja(studentId: number): Observable<any[]> {
  return this.http.get<Polaganje[]>(`${this.apiUrl}/prijavapolaganjas/dostupna/${studentId}`);
}

unesiOcenu(prijavaId: number, brojBodova: number): Observable<PrijavaPolaganja> {
    return this.http.put<PrijavaPolaganja>(`${this.apiUrl}/prijavapolaganjas/ocena/${prijavaId}`, { brojBodova });
  }

  getPrijavaById(id: number): Observable<PrijavaPolaganja> {
    return this.http.get<PrijavaPolaganja>(`${this.apiUrl}/${id}`);
  }

  getPrijaveZaStudenta(studentId: number): Observable<PrijavaPolaganja[]> {
  return this.http.get<PrijavaPolaganja[]>(`${this.apiUrl}/prijavapolaganjas/student/${studentId}`);
}

getAktivnePrijaveZaStudenta(studentId: number): Observable<PrijavaPolaganja[]> {
  return this.http.get<PrijavaPolaganja[]>(`${this.apiUrl}/prijavapolaganjas/student/${studentId}/aktivne`);
}



}
  