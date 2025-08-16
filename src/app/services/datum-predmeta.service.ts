import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatumPredmeta } from '../Model/datumpredmeta';
import { DatumPredmetaCreateDTO } from '../Model/DTO/DatumPredmetaCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class DatumPredmetaService {

  private readonly API_URL = 'http://localhost:8080/api/datumipredmeta';

  constructor(private http: HttpClient) { }

  getAll(): Observable<DatumPredmeta[]> {
      return this.http.get<DatumPredmeta[]>(this.API_URL);
    }
  
    getActive(): Observable<DatumPredmeta[]> {
      return this.http.get<DatumPredmeta[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<DatumPredmeta[]> {
      return this.http.get<DatumPredmeta[]>(`${this.API_URL}/deleted`);
    }

    getByRokId(id: number): Observable<DatumPredmeta[]> {
      return this.http.get<DatumPredmeta[]>(`${this.API_URL}/rok/${id}`);
    }
  
    getById(id: number): Observable<DatumPredmeta> {
      return this.http.get<DatumPredmeta>(`${this.API_URL}/${id}`);
    }
  
    create(datumPredmeta: DatumPredmeta): Observable<DatumPredmeta> {
      return this.http.post<DatumPredmeta>(this.API_URL, datumPredmeta);
    }
  
    update(id: number, datumPredmeta: DatumPredmeta): Observable<DatumPredmeta> {
      return this.http.put<DatumPredmeta>(`${this.API_URL}/${id}`, datumPredmeta);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
