import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PrijavaResultsUploadDTO {
  filePath?: string;
  xmlContent?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrijavaResultsService {
  private baseUrl = 'http://localhost:8080/api/prijave';  // prilagodi na backend API za prijave

  constructor(private http: HttpClient) {}

  uploadResults( dto: PrijavaResultsUploadDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, dto);
  }

  exportResultsPdf() {
  return this.http.get(`${this.baseUrl}/export/pdf`, { responseType: 'blob' });
}
}
