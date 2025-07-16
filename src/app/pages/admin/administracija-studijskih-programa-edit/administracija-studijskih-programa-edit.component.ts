import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { StudijskiProgram } from '../../../Model/studijskiprogram';
import { Katedra } from '../../../Model/katedra';
import { KatedraService } from '../../../services/katedra.service';

@Component({
  selector: 'app-administracija-studijskih-programa-edit',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './administracija-studijskih-programa-edit.component.html',
  styleUrl: './administracija-studijskih-programa-edit.component.scss'
})
export class AdministracijaStudijskihProgramaEditComponent implements OnInit{
  form: FormGroup;

  katedre: Katedra[] = []

  constructor(
    private katedraService: KatedraService,
    private dialogRef: MatDialogRef<AdministracijaStudijskihProgramaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudijskiProgram,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      naziv: [data.naziv ?? null, Validators.required],
      katedraId: [data.katedra?.id ?? null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.katedraService.getActive().subscribe({
      next: res => {
        this.katedre = res;
      },
      error: err => {
        console.error('Greška pri učitavanju katedri:', err);
      }
    });
  }

  save() {
    if (this.form.valid) {
      const updatedProgram: StudijskiProgram = {
        ...this.data,
        naziv: this.form.value.naziv,
        katedra_id: this.form.value.katedraId
      };
      this.dialogRef.close(updatedProgram);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
