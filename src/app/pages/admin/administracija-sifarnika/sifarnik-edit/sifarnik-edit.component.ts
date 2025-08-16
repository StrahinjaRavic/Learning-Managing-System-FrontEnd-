import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { UlogovaniKorisnik } from '../../../../Model/ulogovanikorisnik';
import { Sifarnik } from '../../../../Model/sifarnik';


@Component({
  selector: 'app-sifarnik-edit',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './sifarnik-edit.component.html',
  styleUrl: './sifarnik-edit.component.scss'
})
export class SifarnikEditComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SifarnikEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sifarnik: Sifarnik; title: string },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      naziv: [data.sifarnik.naziv ?? null, Validators.required],
      tekst: [data.sifarnik.tekst ?? null, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      const updatedSifarnik: Sifarnik = {
        ...this.data.sifarnik,
        naziv: this.form.value.naziv,
        tekst: this.form.value.tekst,
      };
      this.dialogRef.close(updatedSifarnik);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
