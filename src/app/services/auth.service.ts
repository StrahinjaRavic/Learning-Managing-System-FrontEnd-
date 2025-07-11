import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private userRolesSubject = new BehaviorSubject<string[]>(this.getUserRolesFromToken());
  userRole$ = this.userRolesSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { responseType: 'text' }).pipe(
      map(token => {
        localStorage.setItem('authToken', token);

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
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserRolesFromToken(): string[] {
  const token = this.getToken();
  if (!token) return [];

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // ✅ Konvertuj niz objekata u niz stringova
    if (Array.isArray(payload.authorities)) {
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
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    // Prava lokacija rola
    if (Array.isArray(payload.authorities)) {
      return payload.authorities;
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
}
