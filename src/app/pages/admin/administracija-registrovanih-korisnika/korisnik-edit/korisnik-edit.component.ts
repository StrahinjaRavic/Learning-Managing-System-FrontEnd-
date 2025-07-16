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
@Component({
  selector: 'app-korisnik-edit',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './korisnik-edit.component.html',
  styleUrl: './korisnik-edit.component.scss'
})
export class KorisnikEditComponent {
  form: FormGroup;


  constructor(
    private dialogRef: MatDialogRef<KorisnikEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UlogovaniKorisnik,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      korisnickoIme: [data.korisnickoIme ?? null, Validators.required],
      lozinka: [data.lozinka ?? null, Validators.required],
      email: [data.email ?? null, [Validators.required, Validators.email]]
    });
  }

  save() {
    if (this.form.valid) {
      const updatedNalog: UlogovaniKorisnik = {
        ...this.data,
        korisnickoIme: this.form.value.korisnickoIme,
        lozinka: this.form.value.lozinka,
        email:this.form.value.email,
        osoba_id: this.data.osoba?.id
      };
      this.dialogRef.close(updatedNalog);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
