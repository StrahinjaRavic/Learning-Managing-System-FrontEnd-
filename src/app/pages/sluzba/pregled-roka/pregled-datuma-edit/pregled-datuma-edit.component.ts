import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, MatOptionModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatumPredmeta } from '../../../../Model/datumpredmeta';
import { DatumPredmetaCreateDTO } from '../../../../Model/DTO/DatumPredmetaCreateDTO';
import { RokService } from '../../../../services/rok.service';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { RealizacijaPredmeta } from '../../../../Model/realizacijapredmeta';
import { MatSelectModule } from '@angular/material/select';
import { Rok } from '../../../../Model/rok';

@Component({
  selector: 'app-pregled-datuma-edit',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './pregled-datuma-edit.component.html',
  styleUrl: './pregled-datuma-edit.component.scss'
})
export class PregledDatumaEditComponent implements OnInit{
  form: FormGroup;
  predmeti: RealizacijaPredmeta[] = [];
  minDate!: Date;
  maxDate!: Date;

  constructor(
    private dialogRef: MatDialogRef<PregledDatumaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {datumPredmeta: DatumPredmeta, title: string , rok: Rok},
    private fb: FormBuilder,
    private rokService: RokService,
    private realizacijaPredmetaService: RealizacijaPredmetaService
  ) {
    this.form = this.fb.group({
      realizacijapredmetaId: [data.datumPredmeta.realizacijaPredmeta?.id ?? null, Validators.required],
      datum: [data.datumPredmeta.datum ? new Date(data.datumPredmeta.datum) : null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.minDate = new Date(this.data.rok.pocetak); // današnji datum
    this.maxDate = new Date(this.data.rok.kraj);

    this.loadData();
  }

  loadData(){
    this.realizacijaPredmetaService.getActive().subscribe({
      next: res => {
        this.predmeti = res;
      }
    })
  }

  save() {
    if (this.form.valid) {
      console.log(this.form.value.realizacijapredmetaId)
      const formValue = this.form.value;
      const newDatum: DatumPredmeta = {
        ...this.data.datumPredmeta,
        rok_id: this.data.rok.id,
        realizacijaPredmeta_id: formValue.realizacijapredmetaId,
        datum: formValue.datum.toISOString(),
      };
      this.dialogRef.close(newDatum);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
