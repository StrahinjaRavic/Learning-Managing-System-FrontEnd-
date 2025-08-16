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
import { EvaluacijaZnanja } from '../../../../Model/evaluacijaznanja';
import { EvaluacijaPrijavaService } from '../../../../services/evaluacija.service';

@Component({
  selector: 'app-pregled-datuma-create',
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
  templateUrl: './pregled-datuma-create.component.html',
  styleUrl: './pregled-datuma-create.component.scss'
})
export class PregledDatumaCreateComponent {

  form: FormGroup;
  predmeti: RealizacijaPredmeta[] = [];
  minDate!: Date;
  maxDate!: Date;
  evaluacije: EvaluacijaZnanja[] = [];
  showEvaluacije: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PregledDatumaCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {datumPredmeta: DatumPredmeta, title: string , rok: Rok},
    private fb: FormBuilder,
    private rokService: RokService,
    private evaluacijaZnanjaService: EvaluacijaPrijavaService,
    private realizacijaPredmetaService: RealizacijaPredmetaService
  ) {
    this.form = this.fb.group({
      realizacijapredmetaId: [data.datumPredmeta.realizacijaPredmeta?.id ?? null, Validators.required],
      datum: [data.datumPredmeta.datum ? new Date(data.datumPredmeta.datum) : null, Validators.required],
      evaluacijaId: [null,Validators.required]
    });
  }
  ngOnInit(): void {
    this.minDate = new Date(this.data.rok.pocetak); // današnji datum
    this.maxDate = new Date(this.data.rok.kraj);

    this.loadData();

    this.form.get('realizacijapredmetaId')?.valueChanges.subscribe(id => {
      if (id) {
        this.loadEvaluacije(id);
      } else {
        this.showEvaluacije = false;
        this.evaluacije = [];
        this.form.get('evaluacijaId')?.reset();
      }
    });
  }

  loadEvaluacije(realizacijaId: number) {
  this.evaluacijaZnanjaService.getByRealizacijaId(realizacijaId).subscribe({
    next: res => {
      this.evaluacije = res;
      this.showEvaluacije = res.length > 0;
    },
    error: () => {
      this.evaluacije = [];
      this.showEvaluacije = false;
    }
  });
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
      this.dialogRef.close({datumPredmeta: newDatum, evaluacijaId: formValue.evaluacijaId ?? null});
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
