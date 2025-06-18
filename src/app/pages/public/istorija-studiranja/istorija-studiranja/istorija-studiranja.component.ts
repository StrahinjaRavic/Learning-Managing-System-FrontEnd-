import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IstorijaStudiranjaService } from '../../../../services/istorija-studiranja.service';

@Component({
  standalone: true,
  selector: 'app-istorija-studiranja',
  imports: [CommonModule],
  templateUrl: './istorija-studiranja.component.html',
})
export class IstorijaStudiranjaComponent implements OnInit {
  studentId = 1; // Trenutno "ulogovani" student
  istorija: {
    predmet: string;
    brojPolaganja: number;
    bodovi: number;
    ocena: number;
    espb: number;
  }[] = [];

  prosecnaOcena: number = 0;
  ukupnoESPB: number = 0;

  constructor(private istorijaService: IstorijaStudiranjaService) {}

  ngOnInit(): void {
    this.istorijaService.getIstorijaStudiranja(this.studentId).subscribe((data) => {
      this.istorija = data;
      this.izracunajStatistiku();
    });
  }

  private izracunajStatistiku(): void {
    if (this.istorija.length === 0) {
      this.prosecnaOcena = 0;
      this.ukupnoESPB = 0;
      return;
    }

    const sumaOcena = this.istorija.reduce((sum, p) => sum + p.ocena, 0);
    const sumaESPB = this.istorija.reduce((sum, p) => sum + p.espb, 0);

    this.prosecnaOcena = parseFloat((sumaOcena / this.istorija.length).toFixed(2));
    this.ukupnoESPB = sumaESPB;
  }
}
