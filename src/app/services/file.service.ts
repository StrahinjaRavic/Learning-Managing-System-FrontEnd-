import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly API_URL = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) { }

  uploadFile(folderId: number, file: File): Observable<File> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<File>(`${this.API_URL}/upload/${folderId}`, formData);
  }

  downloadFile(fileId: number, fileName: string): void {
    this.http.get(`${this.API_URL}/download/${fileId}`, {
      responseType: 'blob',
      observe: 'response'
    }).subscribe(response => {

      // Create download link
      const blob = new Blob([response.body!], { type: response.headers.get('Content-Type') || 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    });
  }

  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${fileId}`);
  }
}
