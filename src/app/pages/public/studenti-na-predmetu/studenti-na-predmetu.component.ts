import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentNaPredmetu } from '../../../Model/studentnapredmetu';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studenti-na-predmetu',
  templateUrl: './studenti-na-predmetu.component.html',
  styleUrls: ['./studenti-na-predmetu.component.scss'],
  standalone: true,
  imports: [
<<<<<<< HEAD
    NgIf, NgFor, MatTableModule, MatButtonModule, MatProgressSpinnerModule,
=======
    NgIf, MatTableModule, MatButtonModule, MatProgressSpinnerModule,
>>>>>>> main
    MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, FormsModule
  ]
})
export class StudentiNaPredmetuComponent implements OnInit {
  studenti: StudentNaPredmetu[] = [];
  sviStudenti: StudentNaPredmetu[] = [];
  predmetId!: number;
  loading = true;
  error = '';
  displayedColumns: string[] = ['ime', 'prezime', 'jmbg', 'brojIndeksa', 'akcije'];

  filter = {
    ime: '',
    prezime: '',
    brojIndeksa: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private realizacijaService: RealizacijaPredmetaService
  ) {}

  ngOnInit(): void {
    this.predmetId = Number(this.route.snapshot.paramMap.get('predmetId'));

    if (!this.predmetId) {
      this.error = 'Nevažeći predmet ID';
      this.loading = false;
      return;
    }

    this.realizacijaService.getStudentiZaPredmet(this.predmetId).subscribe({
      next: data => {
        this.sviStudenti = data;
        this.applyFilter();
        this.loading = false;
      },
      error: err => {
        this.error = 'Greška pri učitavanju studenata';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const ime = this.filter.ime.toLowerCase();
    const prezime = this.filter.prezime.toLowerCase();
    const brojIndeksa = this.filter.brojIndeksa.toLowerCase();

    this.studenti = this.sviStudenti.filter(s =>
      (s.ime?.toLowerCase() ?? '').includes(ime) &&
      (s.prezime?.toLowerCase() ?? '').includes(prezime) &&
      (s.brojIndeksa?.toString().toLowerCase() ?? '').includes(brojIndeksa)
    );
  }

  otvoriUnosBodova(student: any): void {
    this.router.navigate(['/unesi-ocenu', student]);
  }
}
