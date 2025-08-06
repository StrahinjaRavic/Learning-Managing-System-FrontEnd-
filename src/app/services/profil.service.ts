import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UlogovaniKorisnik } from '../Model/ulogovanikorisnik';
import { UlogovaniKorisnikCreateDTO } from '../Model/DTO/UlogovaniKorisnikCreateDTO';



export class ProfilService {
  private readonly API = 'http://localhost:8080/api/ulogovanikorisniks/profil';

  constructor(private http: HttpClient) {}

  getProfil(): Observable<UlogovaniKorisnik> {
    return this.http.get<UlogovaniKorisnik>(this.API);
  }

  updateProfil(korisnik: UlogovaniKorisnik): Observable<UlogovaniKorisnik> {
    return this.http.put<UlogovaniKorisnik>(this.API, korisnik);
  }
}
