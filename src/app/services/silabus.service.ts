import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Silabus } from '../Model/silabus';
import { SilabusSaveDTO } from '../Model/DTO/silabussavedto';

@Injectable({ providedIn: 'root' })
export class SilabusService {
  private apiUrl = 'http://localhost:8080/api/silabuss';

  constructor(private http: HttpClient) {}

  // Dobij silabuse po predmetu i mapiraj ih u frontend model sa predmetId kao broj
  getByPredmetId(predmetId: number): Observable<Silabus[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byPredmet/${predmetId}`)
      .pipe(
        map(silabusi =>
          silabusi.map(s => ({
            id: s.id,
            opis: s.opis,
            predmetId: s.predmet?.id ?? 0,  // izvuci predmetId iz objekta
            obrisano: s.obrisano ?? false
          }))
        )
      );
  }

  toSaveDto(silabus: Silabus): SilabusSaveDTO {
    return {
      id: silabus.id,
      opis: silabus.opis,
      predmet_id: silabus.predmetId,
      obrisano: silabus.obrisano
    };
  }

  save(silabus: Silabus): Observable<Silabus> {
    const dto = this.toSaveDto(silabus);
    if (dto.id && dto.id !== 0) {
      return this.http.put<Silabus>(`${this.apiUrl}/${dto.id}`, dto);
    } else {
      return this.http.post<Silabus>(this.apiUrl, dto);
    }
  }
}
