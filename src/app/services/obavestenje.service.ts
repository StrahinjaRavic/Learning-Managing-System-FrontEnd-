import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Obavestenje } from '../Model/obavestenje';
import { ObavestenjeSaveDTO } from '../Model/DTO/obavestenje-save-dto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ObavestenjeService {
  private apiUrl = 'http://localhost:8080/api/obavestenjes';

  constructor(private http: HttpClient) {}

  getByForumId(forumId: number): Observable<Obavestenje[]> {
    return this.http.get<Obavestenje[]>(`${this.apiUrl}/forum/${forumId}`);
  }

  getByForumNaziv(forumNaziv: String): Observable<Obavestenje[]> {
    return this.http.get<Obavestenje[]>(`${this.apiUrl}/forum/naziv/${forumNaziv}`);
  }

  create(obavestenje: ObavestenjeSaveDTO): Observable<Obavestenje> {
    return this.http.post<Obavestenje>(this.apiUrl, obavestenje);
  }

  update(id: number, obavestenje: ObavestenjeSaveDTO): Observable<Obavestenje> {
    return this.http.put<Obavestenje>(`${this.apiUrl}/${id}`, obavestenje);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/restore/${id}`, {});
    }
}
