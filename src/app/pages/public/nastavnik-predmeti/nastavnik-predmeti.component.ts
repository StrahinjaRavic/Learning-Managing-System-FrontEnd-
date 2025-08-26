import { Component, OnInit } from '@angular/core';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { AuthService } from '../../../services/auth.service';
import { Predmet } from '../../../Model/predmet';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { RealizacijaPredmeta } from '../../../Model/realizacijapredmeta';

@Component({
  selector: 'app-nastavnik-predmeti',
  templateUrl: './nastavnik-predmeti.component.html',
  styleUrls: ['./nastavnik-predmeti.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
})
export class NastavnikPredmetiComponent implements OnInit {
  realizacijaPredmeta: RealizacijaPredmeta[] = [];
  nastavnikId!: number;

  constructor(
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('Nije pronađen username u tokenu');
      return;
    }

    this.authService.getNastavnikIdByUserId(userId).subscribe((id) => {
      if (id == null) {
        console.error('Nastavnik sa datim username-om nije pronađen');
        return;
      }

      this.nastavnikId = id;
      this.loadPredmeti(id);
    });
  }

  otvoriTermine(predmetId: number): void {
    this.router.navigate(['/nastavnik/predmeti', predmetId, 'termini']);
  }

  loadPredmeti(nastavnikId: number): void {
    this.realizacijaPredmetaService.getPredmetiByNastavnikId(nastavnikId).subscribe({
      next: (data) => (this.realizacijaPredmeta = data),
      error: (err) => console.error('Greška pri učitavanju predmeta:', err),
    });
  }
}
