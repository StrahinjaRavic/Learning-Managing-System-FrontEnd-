import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TerminCreateDTO } from '../Model/DTO/TerminCreateDTO';
import { Termin } from '../Model/termin';

@Injectable({
  providedIn: 'root'
})
export class TerminService {
  private readonly API_URL = 'http://localhost:8080/api/termins';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TerminCreateDTO[]> {
    return this.http.get<TerminCreateDTO[]>(this.API_URL);
  }
  
  getActive(): Observable<TerminCreateDTO[]> {
    return this.http.get<TerminCreateDTO[]>(`${this.API_URL}/active`);
  }
  
  getDeleted(): Observable<TerminCreateDTO[]> {
    return this.http.get<TerminCreateDTO[]>(`${this.API_URL}/deleted`);
  }
  
  getById(id: number): Observable<TerminCreateDTO> {
    return this.http.get<TerminCreateDTO>(`${this.API_URL}/${id}`);
  }
  
  createCreateDto(termin: TerminCreateDTO): Observable<TerminCreateDTO> {
    return this.http.post<TerminCreateDTO>(this.API_URL, termin);
  }
  
  updateCreateDto(id: number, termin: TerminCreateDTO): Observable<TerminCreateDTO> {
    return this.http.put<TerminCreateDTO>(`${this.API_URL}/${id}`, termin);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  
  restore(id: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
  }

  getByPredmet(predmetId: number): Observable<Termin[]> {
    return this.http.get<Termin[]>(`${this.API_URL}/predmet/${predmetId}`);
  }

  create(termin: Termin): Observable<Termin> {
    return this.http.post<Termin>(this.API_URL, termin);
  }

  update(id: number, termin: Termin): Observable<Termin> {
    return this.http.put<Termin>(`${this.API_URL}/${id}`, termin);
  }


  getTerminiByPredmet(predmetId: number): Observable<Termin[]> {
    return this.http.get<Termin[]>(`${this.API_URL}/predmet/${predmetId}`);
  }

  updateTermin(termin: Termin): Observable<Termin> {
    const dto = {
      id: termin.id,
      datum: termin.datum,
      vremePocetka: termin.vremePocetka,
      vremeKraja: termin.vremeKraja,
      ishod: termin.ishod,
      realizacijaPredmeta_id: termin.realizacijaPredmeta_id
    };
    return this.http.put<Termin>(`${this.API_URL}/${termin.id}`, dto);
  }

}
