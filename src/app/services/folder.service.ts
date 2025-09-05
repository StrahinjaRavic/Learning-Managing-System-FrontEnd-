import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../Model/Folder';
import { Observable } from 'rxjs';
import { FolderCreateDTO } from '../Model/DTO/FolderCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private readonly API_URL = 'http://localhost:8080/api/folders';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Folder[]> {
      return this.http.get<Folder[]>(this.API_URL);
    }
  
    getActive(): Observable<Folder[]> {
      return this.http.get<Folder[]>(`${this.API_URL}/active`);
    }
  
    getDeleted(): Observable<Folder[]> {
      return this.http.get<Folder[]>(`${this.API_URL}/deleted`);
    }
  
    getById(id: number): Observable<Folder> {
      return this.http.get<Folder>(`${this.API_URL}/${id}`);
    }

    getByForumId(id: number): Observable<Folder> {
      return this.http.get<Folder>(`${this.API_URL}/forum/${id}`);
    }

    getByOsobaId(id: number): Observable<Folder> {
      return this.http.get<Folder>(`${this.API_URL}/osoba/${id}`);
    }
  
    create(folder: FolderCreateDTO): Observable<Folder> {
      return this.http.post<Folder>(this.API_URL, folder);
    }
  
    update(id: number, folder: Folder): Observable<Folder> {
      return this.http.put<Folder>(`${this.API_URL}/${id}`, folder);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
  
    restore(id: number): Observable<void> {
      return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
    }
}
