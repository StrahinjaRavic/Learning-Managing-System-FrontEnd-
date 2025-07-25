import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Obavestenje } from '../../../../Model/obavestenje';
import { ObavestenjeSaveDTO } from '../../../../Model/DTO/obavestenje-save-dto.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-obavestenje-edit',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './obavestenje-edit.component.html',
  styleUrl: './obavestenje-edit.component.scss'
})
export class ObavestenjeEditComponent{
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ObavestenjeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { obavestenje: Obavestenje; titles: string },
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      naslov: [data.obavestenje.naslov ?? null, Validators.required],
      tekst: [data.obavestenje.tekstObavjestenja ?? null, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      const updatedObavestenje: Obavestenje = {
        ...this.data.obavestenje,
        naslov: this.form.value.naslov,
        tekstObavjestenja: this.form.value.tekst,
        vremePostavljanja: new Date().toISOString(),
        forum_id: this.data.obavestenje.forum.id,
        ulogovaniKorisnik_id: this.data.obavestenje.korisnik.id
      };
      this.dialogRef.close(updatedObavestenje);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
