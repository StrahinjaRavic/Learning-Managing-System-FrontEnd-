import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerminService } from '../../../services/termin.service';
import { Termin } from '../../../Model/termin';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-nastavnik-predmet-termini',
  templateUrl: './termin.component.html',
  imports:[CommonModule, FormsModule]
})
export class TerminComponent implements OnInit {
  predmetId!: number;
  termini: Termin[] = [];

  constructor(private route: ActivatedRoute, private terminService: TerminService) {}

  ngOnInit(): void {
    this.predmetId = +this.route.snapshot.paramMap.get('id')!;
    this.terminService.getTerminiByPredmet(this.predmetId).subscribe((data) => {
      this.termini = data;
    });
  }

  formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
}

  sacuvaj(termin: Termin): void {
    console.log(termin)
    this.terminService.updateTermin(termin).subscribe({
      next: () => alert('Uspešno sačuvano.'),
      error: () => alert('Greška pri čuvanju.')
    });
  }
}
