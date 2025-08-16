import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { Rok } from '../../../../Model/rok';

@Component({
  selector: 'app-kreiranje-roka-edit',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './kreiranje-roka-edit.component.html',
  styleUrl: './kreiranje-roka-edit.component.scss'
})
export class KreiranjeRokaEditComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<KreiranjeRokaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {rok: Rok, title: string},
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      naziv: [data.rok.naziv ?? '', Validators.required],
      pocetak: [data.rok.pocetak ? new Date(data.rok.pocetak) : null, Validators.required],
      kraj: [data.rok.kraj ? new Date(data.rok.kraj) : null, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const newRok: Rok = {
        ...this.data.rok,
        naziv: formValue.naziv,
        pocetak: formValue.pocetak.toISOString(),
        kraj: formValue.kraj.toISOString(),
      };
      this.dialogRef.close(newRok);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
