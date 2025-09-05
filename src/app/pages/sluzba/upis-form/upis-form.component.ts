import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { GodinaStudija } from '../../../../../../Model/godinastudija';
import { Student } from '../../../../../../Model/student';
import { StudentNaGodini } from '../../../../../../Model/studentnagodini';

import { UpisService } from '../../../../../../services/upis.service';

@Component({
  selector: 'app-upis-studenta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './upis-form.component.html',
  styleUrls: ['./upis-form.component.scss'],
  providers: [
  ],
})

export class UpisFormComponent implements OnInit {
  private upisService = inject(UpisService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  forma: FormGroup = this.fb.group({
    studentId: [null, Validators.required],
    godinaStudijaId: [null, Validators.required],
    datumUpisa: [null, Validators.required]
  });

  studenti: Student[] = [];
  godine: GodinaStudija[] = [];

  ngOnInit(): void {
    this.upisService.getSviStudenti().subscribe(data => {
      this.studenti = data;
    });

    this.upisService.getSveGodineStudija().subscribe(data => {
      this.godine = data;
    });
  }

  onSubmit(): void {
    if (this.forma.invalid) return;

    const dto = {
      studentId: this.forma.value.studentId,
      godinaStudijaId: this.forma.value.godinaStudijaId,
      datumUpisa: this.forma.value.datumUpisa
    };

    this.upisService.upisiStudenta(dto).subscribe((rezultat: StudentNaGodini) => {
      this.snackBar.open(
        `Uspešno upisan student sa indeksom ${rezultat.brojIndeksa}`,
        'Zatvori',
        { duration: 3000 }
      );

      this.forma.reset();
    });
  }
}
