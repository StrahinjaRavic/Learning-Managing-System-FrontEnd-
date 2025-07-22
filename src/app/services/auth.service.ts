import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private userRolesSubject = new BehaviorSubject<string[]>(this.getUserRolesFromToken());
  userRole$ = this.userRolesSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { responseType: 'text' }).pipe(
      map(token => {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('authToken', token);
        }

        this.userRolesSubject.next(this.getUserRolesFromToken());
        const payload = JSON.parse(atob(token.split('.')[1]));

        console.log('Decoded payload:', payload);

        return token;
      }),
      catchError(err => throwError(() => new Error('Greška pri prijavljivanju')))
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.userRolesSubject.next([]);
  }

  isLoggedIn(): boolean {
    return !! this.getToken();
  }

  getToken(): string | null {

    if (typeof window !== 'undefined' && window.localStorage) {// sprečava SSR crash
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getUserRolesFromToken(): string[] {
  const token = this.getToken();
  if (!token) return [];

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (Array.isArray(payload.authorities)) {
      // ako su stringovi, vrati ih direktno
      if (typeof payload.authorities[0] === 'string') {
        return payload.authorities;
      }
      // ako su objekti (staro stanje), mapiraj ih na property 'authority'
      return payload.authorities.map((auth: any) => auth.authority);
    }

    return [];
  } catch (e) {
    console.error('Failed to parse token:', e);
    return [];
  }
}



  getUserRoles(): string[] {
  const token = this.getToken();
  if (!token) return [];

  try {
    const payloadJson = atob(token.split('.')[1]);
    const payload = JSON.parse(payloadJson);

    if (Array.isArray(payload.authorities)) {
      if (typeof payload.authorities[0] === 'string') {
        return payload.authorities;
      }
      return payload.authorities.map((auth: any) => auth.authority);
    } else if (typeof payload.authorities === 'string') {
      return [payload.authorities];
    }
  } catch (e) {
    console.error('Error decoding token:', e);
  }

  return [];
}




  getUserRole(): string | null {
  const roles = this.getUserRoles();
  return null;
}


  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  register(data: { username: string; email?: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/auth/register`, data, { responseType: 'text' }).pipe(
      catchError(err => throwError(() => new Error('Greška pri registraciji')))
    );
  }

  getLoggedInUserId(): number | null {
    const payload = this.decodeToken();
    if (!payload) return null;

    const userId = payload.sub;
    console.log(userId)
    return typeof userId === 'number' ? userId : parseInt(userId, 10);
  }

  private decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    } catch {
      return null;
    }
  }

  getUsernameFromToken(): string | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || payload.preferred_username || null;
  } catch {
    return null;
  }
}


  getNastavnikIdByUsername(username: string): Observable<number | null> {
    if (!username) return of(null);
    return this.http.get<number>(`${this.apiUrl}/nastavniks/idByUsername/${username}`)
      .pipe(
        catchError(() => of(null))
      );
  }

  getStudentIdByUsername(username: string): Observable<number | null> {
    if (!username) return of(null);
    return this.http.get<number>(`${this.apiUrl}/students/idByUsername/${username}`)
      .pipe(
        catchError(() => of(null))
      );
  }

  getUserIdByUsername(username: string): Observable<number> {
  return this.http.get<number>(`http://localhost:8080/api/ulogovanikorisniks/idByUsername/${username}`);
}

}
