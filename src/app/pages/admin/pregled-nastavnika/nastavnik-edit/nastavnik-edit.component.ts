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
import { Nastavnik } from '../../../../Model/nastavnik';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { OsobaService } from '../../../../services/osoba.service';
import { Osoba } from '../../../../Model/osoba';
import { forkJoin } from 'rxjs';
import { NastavnikCreateDTO } from '../../../../Model/DTO/NastavnikCreateDTO';

@Component({
  selector: 'app-nastavnik-edit',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './nastavnik-edit.component.html',
  styleUrl: './nastavnik-edit.component.scss'
})
export class NastavnikEditComponent implements OnInit{
  form: FormGroup;
  osobe: Osoba[] = [];
  nastavnici: Nastavnik[] = [];

  constructor(
    private dialogRef: MatDialogRef<NastavnikEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Nastavnik,
    private fb: FormBuilder,
    private nastavnikService: NastavnikService,
    private osobaService: OsobaService
  ) {
    this.form = this.fb.group({
      biografija: [data.biografija ?? ""],
      osoba: [data.osoba?.id ?? null, Validators.required],
    });
  }

  ngOnInit(): void {
    forkJoin({
    osobe: this.osobaService.getActive(),
    nastavnici: this.nastavnikService.getActive()
  }).subscribe({
    next: ({ osobe, nastavnici }) => {
      this.nastavnici = nastavnici;

      const nastavnikOsobaIds = new Set(nastavnici.map(n => n.osoba.id));

      this.osobe = osobe.filter(o => !nastavnikOsobaIds.has(o.id));
    }
  });
  }

  save() {
    if (this.form.valid) {
      const nastavnik: NastavnikCreateDTO = {
        osoba_id: this.form.value.osoba,
        biografija: this.form.value.biografija || ""
      }
      this.dialogRef.close(nastavnik);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
