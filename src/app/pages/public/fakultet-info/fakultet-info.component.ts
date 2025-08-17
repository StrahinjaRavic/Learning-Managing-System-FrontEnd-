import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakultetService } from '../../../services/fakultet.service';
import { Fakultet } from '../../../Model/fakultet';
import { MatCardModule } from '@angular/material/card';
<<<<<<< HEAD
=======
import { KatedraService } from '../../../services/katedra.service';
import { forkJoin } from 'rxjs';
import { Katedra } from '../../../Model/katedra';
import { NavigationEnd, Router } from '@angular/router';
import { SifarnikService } from '../../../services/sifarnik.service';
import { Sifarnik } from '../../../Model/sifarnik';
>>>>>>> main

@Component({
  selector: 'app-fakultet-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './fakultet-info.component.html',
<<<<<<< HEAD
})
export class FakultetInfoComponent implements OnInit {
  fakulteti: Fakultet[] = [];

  constructor(private fakultetService: FakultetService) {}

  ngOnInit(): void {
  this.fakultetService.getActive().subscribe({
    next: res => {
      console.log('Dobijeni fakulteti:', res);
      this.fakulteti = res;
    },
    error: err => {
      console.error('Greška pri učitavanju fakulteta:', err);
    }
  });
}
=======
  styleUrl: './fakultet-info.component.scss'
})
export class FakultetInfoComponent implements OnInit {
  fakulteti: Fakultet[] = [];
  sifarnici: Sifarnik[] = [];

  constructor(private fakultetService: FakultetService,private katedraService: KatedraService,private router: Router, private sifarnikService: SifarnikService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  redirect(katedra: Katedra){
    this.router.navigate([`/fakultet/katedra`, katedra.id]);
  }

  pronadjiOpiseIKontakte(): void {

    this.fakulteti.forEach(fakultet => {
      const opisSifarnik = this.sifarnici.find(
        sifarnik => sifarnik.naziv.trim().toLowerCase() === fakultet.naziv.trim().toLowerCase()
      );

      const kontaktSifarnik = this.sifarnici.find(sifarnik =>
        sifarnik.naziv?.trim().toLowerCase() === `${fakultet.naziv.trim().toLowerCase()} kontakt`
      );

      if (opisSifarnik) {
        fakultet.opis = opisSifarnik.tekst;
      }

      if(kontaktSifarnik){
        fakultet.kontakt = kontaktSifarnik.tekst;
      }
    });
  }

  loadData() {
    forkJoin({
      fakulteti: this.fakultetService.getActive(),
      sifarnici: this.sifarnikService.getActive()
    }).subscribe({
      next: ({ fakulteti, sifarnici }) => {
        this.fakulteti = fakulteti;
        this.sifarnici = sifarnici;

        this.pronadjiOpiseIKontakte();

        const katedraCalls = this.fakulteti.map(f => this.katedraService.getByFakultetId(f.id));
        forkJoin(katedraCalls).subscribe({
          next: katedreLists => {
            this.fakulteti.forEach((f, i) => f.katedre = katedreLists[i]);
          },
          
        });
      },
      error: err => {
        
      }
    });
  }
>>>>>>> main
}
