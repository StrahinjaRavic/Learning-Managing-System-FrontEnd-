import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, catchError } from 'rxjs';
import { UlogovaniKorisnik } from '../Model/ulogovanikorisnik';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/ulogovanikorisnik';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<UlogovaniKorisnik> {
    return this.http.get<UlogovaniKorisnik[]>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`).pipe(
      map(users => {
        if (users.length === 1) {
          const user = users[0];
          localStorage.setItem('userId', user.id.toString());
          return user;
        } else {
          throw new Error('Pogrešan email ili lozinka');
        }
      }),
      catchError(err => throwError(() => new Error('Greška pri prijavljivanju')))
    );
  }

  register(data: Partial<UlogovaniKorisnik>): Observable<UlogovaniKorisnik> {
    return this.http.post<UlogovaniKorisnik>(this.apiUrl, data);
  }

  logout(): void {
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getLoggedInUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null;
  }

  getLoggedInUser(): Observable<UlogovaniKorisnik | null> {
    const id = this.getLoggedInUserId();
    if (id === null) return throwError(() => new Error('Nema ulogovanog korisnika'));
    return this.http.get<UlogovaniKorisnik>(`${this.apiUrl}/${id}`);
  }
}
