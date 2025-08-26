import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Forum } from '../Model/forum';
import { Observable } from 'rxjs';
import { Obavestenje } from '../Model/obavestenje';
import { Nastavnik } from '../Model/nastavnik';
import { ForumSaveDTO } from '../Model/DTO/forumSaveDTO';
import { ForumHasKorisnikCreateDTO } from '../Model/DTO/forumHasKorisnikCreateDTO';
import { ForumHasKorisnik } from '../Model/forumhaskorisnik';


@Injectable({ providedIn: 'root' })
export class ForumService {
  private readonly API = 'http://localhost:8080/api/forumhaskorisniks';
  private readonly API1 = 'http://localhost:8080/api/obavestenjes';
  private readonly API2 = 'http://localhost:8080/api/forums';

  constructor(private http: HttpClient) {}

  getMojiForumi(userId: number, svi: boolean = false): Observable<Forum[]> {
  if (svi) {
    return this.getSviForumi();
  }
  return this.http.get<Forum[]>(`${this.API}/korisnik/${userId}`);
}


  getSviForumi(): Observable<Forum[]> {
  return this.http.get<Forum[]>(`${this.API2}`); // API2 je http://localhost:8080/api/forums
}


  create(forum: ForumSaveDTO): Observable<Forum> {
        return this.http.post<Forum>(this.API2, forum);
      }

  getObavestenjaZaForum(forumId: number): Observable<Obavestenje[]> {
    return this.http.get<Obavestenje[]>(`${this.API1}/forum/${forumId}`);
  }

  getForumByNaziv(forumNaziv: string): Observable<Forum> {
    return this.http.get<Forum>(`${this.API2}/naziv/${forumNaziv}`);
  }

  getKorisniciZaForum(forumId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/forumhaskorisniks/forum/${forumId}/korisnici`);
}

dodajStudentaNaForum(forumId: number, studentId: number): Observable<void> {
  return this.http.post<void>(`${this.API}/forum/${forumId}/student/${studentId}`, {});
}

ukloniStudentaSaForuma(forumId: number, studentId: number): Observable<void> {
  return this.http.delete<void>(`${this.API}/forum/${forumId}/student/${studentId}`);
}

getNeprijavljeniStudentiZaForum(forumId: number, filter?: string): Observable<any[]> {
  let url = `http://localhost:8080/api/students/available?forumId=${forumId}`;
  if (filter && filter.trim().length > 0) {
    url += `&filter=${encodeURIComponent(filter)}`;
  }
  return this.http.get<any[]>(url);
}


// Dostupni nastavnici za forum, sa opcionalnim filterom po imenu/prezimenu
getAvailableNastavnici(forumId: number, filter?: string): Observable<Nastavnik[]> {
    let params = new HttpParams().set('forumId', forumId.toString());
    if (filter) {
      params = params.set('filter', filter);
    }
    return this.http.get<Nastavnik[]>(`${this.API}/available-nastavnici`, { params });
  }

// Dodavanje nastavnika na forum
dodajNastavnikaNaForum(forumId: number, nastavnikId: number): Observable<void> {
  return this.http.post<void>(`http://localhost:8080/api/forumhaskorisniks/forum/${forumId}/nastavnik/${nastavnikId}`, {});
}

// Uklanjanje nastavnika sa foruma
ukloniNastavnikaSaForuma(forumId: number, nastavnikId: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:8080/api/forumhaskorisniks/forum/${forumId}/nastavnik/${nastavnikId}`);
}

  addKorisnikToForum(korisnik: ForumHasKorisnikCreateDTO): Observable<ForumHasKorisnik>{
    return this.http.post<ForumHasKorisnik>(this.API, korisnik);
  }
}
