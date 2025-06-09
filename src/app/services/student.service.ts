import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly API_URL = 'http://localhost:3000/ulogovanikorisnik';

  constructor(private http: HttpClient) {}

  /**
   * Dohvata sve predmete koje student sluša.
   */
  getPredmetiZaStudenta(studentId: number): Observable<any[]> {
    return this.http.get<any>(`${this.API_URL}/${studentId}`).pipe(
      map(student => {
        const predmeti: any[] = [];

        student.studentNaGodini?.forEach((godina: any) => {
          godina.pohadjanjaPredmeta?.forEach((pohadjanje: any) => {
            const predmet = pohadjanje.realizacijaPredmeta?.predmet;
            if (predmet) {
              predmeti.push(predmet);
            }
          });
        });

        return predmeti;
      })
    );
  }
}
