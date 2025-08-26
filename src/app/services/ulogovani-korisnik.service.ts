import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UlogovaniKorisnik } from '../Model/ulogovanikorisnik';
import { UlogovaniKorisnikCreateDTO } from '../Model/DTO/UlogovaniKorisnikCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class UlogovaniKorisnikService {
  private readonly API_URL = 'http://localhost:8080/api/ulogovanikorisniks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<UlogovaniKorisnik[]> {
      return this.http.get<UlogovaniKorisnik[]>(this.API_URL);
    }
  
    getActive(): Observable<UlogovaniKorisnik[]> {
      return this.http.get<UlogovaniKorisnik[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<UlogovaniKorisnik[]> {
      return this.http.get<UlogovaniKorisnik[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<UlogovaniKorisnik> {
      return this.http.get<UlogovaniKorisnik>(`${this.API_URL}/${id}`);
    }

    getByOsobaId(id: number): Observable<UlogovaniKorisnik> {
      return this.http.get<UlogovaniKorisnik>(`${this.API_URL}/osoba/${id}`);
    }
  
    create(korisnik: UlogovaniKorisnikCreateDTO): Observable<UlogovaniKorisnik> {
      return this.http.post<UlogovaniKorisnik>(this.API_URL, korisnik);
    }
  
    update(id: number, korisnik: UlogovaniKorisnik): Observable<UlogovaniKorisnik> {
      return this.http.put<UlogovaniKorisnik>(`${this.API_URL}/${id}`, korisnik);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
  }