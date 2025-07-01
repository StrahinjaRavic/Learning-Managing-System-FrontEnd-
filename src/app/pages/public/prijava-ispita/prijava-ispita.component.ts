import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rok } from '../../../Model/rok';
import { Predmet } from '../../../Model/predmet';
import { EvaluacijaZnanja } from '../../../Model/evaluacijaznanja';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prijava-ispita',
  imports: [CommonModule],
  templateUrl: './prijava-ispita.component.html',
})
export class PrijavaIspitaComponent implements OnInit {
  rok: Rok | null = null;
  nepolozeniPredmeti: Predmet[] = [];
  studentId: number = 1;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    //this.studentId = this.auth.getUser().osoba.id;
    this.studentId = 1;

    this.http.get<Rok[]>('http://localhost:8080/api/roks/active').subscribe({
      next: roks => {
        this.rok = roks[0] || null;
        if (this.rok) this.ucitajNepolozenePredmete();
      },
      error: err => console.error('Greška kod roka:', err)
    });
  }

  ucitajNepolozenePredmete() {
    this.http.get<Predmet[]>(`http://localhost:8080/api/pohadjanjepredmetas/predmeti/nepolozeni/${this.studentId}`)
      .subscribe({
        next: predmeti => this.nepolozeniPredmeti = predmeti,
        error: err => console.error('Greška kod predmeta:', err)
      });
  }

  prijavi(predmet: Predmet) {
    const body: Partial<EvaluacijaZnanja> = {
      naziv: 'Prijava ispita',
      brojBodova: 0,
      datum: new Date().toISOString(), // backend će overwrite-ovati ako postoji datumPredmeta
      obrisano: false,
      pohadjanjepredmeta: {
        id: this.nadjiPohadjanjeZaPredmet(predmet.id)
      } as any, // ako znaš ID pohadjanja, ubaci ovde
      rok: {id: this.rok!.id} as any
    };

    this.http.post<EvaluacijaZnanja>('http://localhost:8080/api/evaluacijaznanjas', body)
      .subscribe({
        next: () => alert(`Uspešno prijavljen predmet: ${predmet.naziv}`),
        error: err => alert(`Greška: ${err.error?.message || 'Nije uspelo'}`)
      });
  }

  // Dummy logika, zameni kad povežeš pohadjanje
  nadjiPohadjanjeZaPredmet(predmetId: number): number {
    // npr. koristi servis koji vraća PohadjanjePredmeta po studentId i predmetId
    return 0;
  }
}
