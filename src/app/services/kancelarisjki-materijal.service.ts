import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KancelarijskiMaterijal } from '../Model/kancelarijskimaterijal';


@Injectable({
  providedIn: 'root'
})
export class KancelarijskiMaterijalService {

   private url = 'http://localhost:8080/kancelarijski-materijal';

  constructor(private http: HttpClient) {}

  getAll(): Observable<KancelarijskiMaterijal[]> {
    return this.http.get<KancelarijskiMaterijal[]>(this.url);
  }

  create(materijal: KancelarijskiMaterijal): Observable<KancelarijskiMaterijal> {
    return this.http.post<KancelarijskiMaterijal>(this.url, materijal);
  }

  update(id: string, materijal: KancelarijskiMaterijal): Observable<KancelarijskiMaterijal> {
    return this.http.put<KancelarijskiMaterijal>(`${this.url}/${id}`, materijal);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}