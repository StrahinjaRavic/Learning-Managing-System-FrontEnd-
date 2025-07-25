import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forum } from '../Model/forum';
import { Observable } from 'rxjs';
import { Obavestenje } from '../Model/obavestenje';


@Injectable({ providedIn: 'root' })
export class ForumService {
  private readonly API = 'http://localhost:8080/api/forumhaskorisniks';
  private readonly API1 = 'http://localhost:8080/api/obavestenjes';
  private readonly API2 = 'http://localhost:8080/api/forums';

  constructor(private http: HttpClient) {}

  getMojiForumi(userId: number): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.API}/korisnik/${userId}`);
  }

  getObavestenjaZaForum(forumId: number): Observable<Obavestenje[]> {
    return this.http.get<Obavestenje[]>(`${this.API1}/forum/${forumId}`);
  }

  getForumByNaziv(forumNaziv: string): Observable<Forum> {
    return this.http.get<Forum>(`${this.API2}/naziv/${forumNaziv}`);
  }
}
