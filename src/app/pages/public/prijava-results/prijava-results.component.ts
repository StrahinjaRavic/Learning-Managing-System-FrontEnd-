import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrijavaResultsService } from '../../../services/evaluacija-results.service';
import { PrijavaResultsUploadDTO } from '../../../Model/DTO/PrijavaResultsUploadDTO';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-prijava-results',
  templateUrl: './prijava-results.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule,MatInputModule],
})
export class PrijavaResultsComponent {
  xmlContent: string = '';

  uploadErrors: string[] = [];
  successCount: number = 0;

  constructor(private prijavaService: PrijavaResultsService) {}

  upload() {
  const dto: PrijavaResultsUploadDTO = {
    xmlContent: this.fileContent || this.xmlContent || undefined,
    // filePath ti sada nije potreban, možeš ga izbaciti
  };
  this.prijavaService.uploadResults(dto).subscribe({
    next: (res) => {
      this.successCount = res.successCount;
      this.uploadErrors = res.errors || [];
    },
    error: (err) => {
      this.uploadErrors = [err.error?.error || 'Nepoznata greška pri uploadu'];
    }
  });
}


  downloadPdf() {
    this.prijavaService.exportResultsPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prijave_polaganja.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  fileContent: string = '';

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    this.xmlContent = reader.result as string;
  };
  reader.readAsText(file);
}

uploadFile(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const text = reader.result as string;
    this.xmlContent = text;
  };

  reader.readAsText(file);
}


}
