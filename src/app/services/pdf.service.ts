import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PDFService {
  private readonly API_URL = 'http://localhost:8080/api/pdf/uverenje';

  constructor(private http: HttpClient) { }
  
    getUverenje(id: number): Observable<Blob> {
      return this.http.get(`${this.API_URL}/${id}`, {
      responseType: 'blob'
    });
    }
}
