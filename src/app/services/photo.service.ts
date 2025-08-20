import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfilePhoto } from '../Model/profilePhoto';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly API_URL = 'http://localhost:8080/api/photos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProfilePhoto[]> {
      return this.http.get<ProfilePhoto[]>(this.API_URL);
    }
  
    getActive(): Observable<ProfilePhoto[]> {
      return this.http.get<ProfilePhoto[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<ProfilePhoto[]> {
      return this.http.get<ProfilePhoto[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<ProfilePhoto> {
      return this.http.get<ProfilePhoto>(`${this.API_URL}/${id}`);
    }
  
    create(pohadjanje: ProfilePhoto): Observable<ProfilePhoto> {
      return this.http.post<ProfilePhoto>(this.API_URL, pohadjanje);
    }
  
    update(id: number, pohadjanje: ProfilePhoto): Observable<ProfilePhoto> {
      return this.http.put<ProfilePhoto>(`${this.API_URL}/${id}`, pohadjanje);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
