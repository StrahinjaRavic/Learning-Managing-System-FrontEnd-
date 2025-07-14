import { Component, OnInit } from '@angular/core';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { AuthService } from '../../../services/auth.service';
import { Predmet } from '../../../Model/predmet';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nastavnik-predmeti',
  templateUrl: './nastavnik-predmeti.component.html',
  styleUrls: ['./nastavnik-predmeti.component.scss'],
  imports: [CommonModule, RouterModule, NgIf]
})
export class NastavnikPredmetiComponent implements OnInit {
  predmeti: Predmet[] = [];
  nastavnikId!: number;

  constructor(
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  const username = this.authService.getUsernameFromToken();
  if (!username) {
    console.error('Nije pronađen username u tokenu');
    return;
  }

  this.authService.getNastavnikIdByUsername(username).subscribe(id => {
    if (id == null) {
      console.error('Nastavnik sa datim username-om nije pronađen');
      return;
    }

    this.nastavnikId = id;
    this.loadPredmeti(id);
  });
}

loadPredmeti(nastavnikId: number): void {
  this.realizacijaPredmetaService.getPredmetiByNastavnikId(nastavnikId)
    .subscribe({
      next: data => this.predmeti = data,
      error: err => console.error('Greška pri učitavanju predmeta:', err)
    });
}
}
