import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentNaPredmetu } from '../../../Model/studentnapredmetu';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-studenti-na-predmetu',
  templateUrl: './studenti-na-predmetu.component.html',
  styleUrls: ['./studenti-na-predmetu.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class StudentiNaPredmetuComponent implements OnInit {
  studenti: StudentNaPredmetu[] = [];
  predmetId!: number;
  loading = true;
  error = '';

  constructor(
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
        this.studenti = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Greška pri učitavanju studenata';
        this.loading = false;
      }
    });
  }
}
