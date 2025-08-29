import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrijavaPolaganjaService } from '../../../services/prijava-polaganja.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PrijavaPolaganja } from '../../../Model/prijavapolaganja';

@Component({
  selector: 'app-unesi-ocenu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatInputModule, MatButtonModule],
  templateUrl: './unesi-ocenu.component.html'
})
export class UnesiOcenuComponent implements OnInit {
  studentId!: number;
  realizacijaPredmetaId!: number;
  prijave: PrijavaPolaganja[] = [];
  forme: { [prijavaId: number]: FormGroup } = {};
  studentImePrezime: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prijavaService: PrijavaPolaganjaService
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('studentId'));
    this.realizacijaPredmetaId = Number(this.route.snapshot.paramMap.get('realizacijaPredmetaId'));

    if (!this.studentId || !this.realizacijaPredmetaId) {
      console.error('Nedostaje studentId ili realizacijaPredmetaId u ruti.');
      return;
    }

    this.prijavaService.getPrijaveZaStudenta(this.studentId, this.realizacijaPredmetaId).subscribe({
      next: data => {
        this.prijave = data;
        console.log(data);

        if (this.prijave.length > 0) {
          const student = this.prijave[0]?.pohadjanjePredmeta?.studentNaGodini?.student?.osoba;
          this.studentImePrezime = student
            ? `${student.ime} ${student.prezime}`
            : `#${this.studentId}`;
        }

        this.prijave.forEach(prijava => {
          const brojBodova = prijava.brojBodova ?? null;
          this.forme[prijava.id] = this.fb.group({
            brojBodova: [brojBodova, [Validators.required, Validators.min(0), Validators.max(100)]]
          });
        });
      },
      error: err => {
        console.error('Greška pri dohvatanju prijava:', err);
      }
    });
  }

  onSubmit(prijavaId: number): void {
    const forma = this.forme[prijavaId];
    if (!forma || forma.invalid) return;

    const brojBodova = forma.value.brojBodova;

    this.prijavaService.unesiOcenu(prijavaId, brojBodova).subscribe({
      next: () => {
        alert(`Bodovi uspešno uneti za prijavu #${prijavaId}`);
      },
      error: err => {
        console.error(err);
        alert(`Greška pri unosu bodova za prijavu #${prijavaId}`);
      }
    });
  }
}
