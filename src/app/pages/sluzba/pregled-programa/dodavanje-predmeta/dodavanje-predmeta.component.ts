import { Component, Inject } from '@angular/core';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GodinaStudija } from '../../../../Model/godinastudija';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Nastavnik } from '../../../../Model/nastavnik';
import { RealizacijaPredmeta } from '../../../../Model/realizacijapredmeta';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { PredmetService } from '../../../../services/predmet.service';
import { Predmet } from '../../../../Model/predmet';

@Component({
  selector: 'app-dodavanje-predmeta',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './dodavanje-predmeta.component.html',
  styleUrl: './dodavanje-predmeta.component.scss'
})
export class DodavanjePredmetaComponent {
   form: FormGroup;

  nastavnici: Nastavnik[] = [];
  predmeti: Predmet[] = [];
  isEditMode: boolean;

  constructor(
    private nastavnikService: NastavnikService,
    private predmetService: PredmetService,
    private dialogRef: MatDialogRef<DodavanjePredmetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {predmet: RealizacijaPredmeta,title: String},
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data.predmet;

    this.form = this.fb.group({
      predmet_id: [data.predmet?.predmet?.id ?? null, Validators.required],
      nastavnik_id: [data.predmet?.nastavnik?.id ?? null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.nastavnikService.getActive().subscribe({
      next: res => {
        this.nastavnici = res;
      },
      error: err => {
        console.error('Greška pri učitavanju nastavnika:', err);
      }
    });

    this.predmetService.getActive().subscribe({
      next: res => {
        this.predmeti = res
      }
    })
  }

  save() {
    if (this.form.valid) {
      const updatedRealizacija: RealizacijaPredmeta = {
        ...this.data.predmet,
        predmet_id: this.isEditMode ? this.data.predmet?.predmet.id! :  this.form.value.predmet_id as any,
        nastavnik_id: this.form.value.nastavnik_id
      };
      this.dialogRef.close(updatedRealizacija);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
