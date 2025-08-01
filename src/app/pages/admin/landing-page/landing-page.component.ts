import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UlogovaniKorisnikService } from '../../../services/ulogovani-korisnik.service';
import { StudentService } from '../../../services/student.service';
import { UlogovaniKorisnik } from '../../../Model/ulogovanikorisnik';
import { Student } from '../../../Model/student';
import { Nastavnik } from '../../../Model/nastavnik';
import { NastavnikService } from '../../../services/nastavnik.service';

@Component({
  selector: 'app-landing-page',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{

  sviKorisnici: UlogovaniKorisnik[] = [];
  sviStudenti: Student[] = []
  sviNastavnici: Nastavnik[] = []
  korisnici = 0;
  studenti = 0;
  nastavnici = 7;

  constructor(private ulogovaniKorisnikService: UlogovaniKorisnikService,private studentService: StudentService, private nastavnikService: NastavnikService){}
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){

    this.ulogovaniKorisnikService.getAll().subscribe({
      next: res => {
        this.sviKorisnici  = res;
        this.korisnici = this.sviKorisnici.length
      },
      error: err => {
        console.error('Greška pri učitavanju korisnika:', err);
      }
    });

    this.studentService.getAll().subscribe({
      next: res => {
        this.sviStudenti  = res;
        this.studenti = this.sviStudenti.length
      },
      error: err => {
        console.error('Greška pri učitavanju studenata:', err);
      }
    });

    this.nastavnikService.getAll().subscribe({
      next: res => {
        this.sviNastavnici  = res;
        this.nastavnici = this.sviNastavnici.length
      },
      error: err => {
        console.error('Greška pri učitavanju nastavnika:', err);
      }
    });
  }

}
