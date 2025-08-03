import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudijskiProgram } from './../../../../Model/studijskiprogram';
import { StudijskiProgramService } from './../../../../services/studijski-program.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RealizacijaPredmeta } from '../../../../Model/realizacijapredmeta';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { Sifarnik } from '../../../../Model/sifarnik';
import { SifarnikService } from '../../../../services/sifarnik.service';

@Component({
  selector: 'app-studijski-program-detalji',
  templateUrl: './studijski-program-detalji.component.html',
  styleUrls: ['./studijski-program-detalji.component.scss'],
  imports: [MatCardModule,MatDividerModule, CommonModule, MatListModule, MatIconModule],
})
export class StudijskiProgramDetaljiComponent implements OnInit {
  program!: StudijskiProgram;
  opis!: String;
  realizacijePredmeta: RealizacijaPredmeta[] = [];
  otvoreniIndex: number | null = null;
  sifarnici: Sifarnik[] = [];

  constructor(
    private route: ActivatedRoute,
    private programService: StudijskiProgramService,
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private sifarnikService: SifarnikService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.programService.getById(id).subscribe((data) => {
        this.program = data;

        this.sifarnikService.getActive().subscribe({
          next: res => {
            this.sifarnici = res;
            this.pronadjiOpis();
          }
        })
      });
    }

    this.realizacijaPredmetaService.getRealizacijaByStudijskiProgramId(id).subscribe({
      next: res => {
        this.realizacijePredmeta = res
      }
    })
  }

  pronadjiOpis(): void {
    const opisSifarnik = this.sifarnici.find(sifarnik =>
        sifarnik.naziv?.trim().toLowerCase() === `${this.program.naziv.trim().toLowerCase()} opis`
    );
    if(opisSifarnik){
        this.opis = opisSifarnik.tekst;
      }
  }

  toggleDetalji(index: number): void {
    console.log('Klik na:', index);
  if (this.otvoreniIndex === index) {
    this.otvoreniIndex = null; // zatvara ako je već otvoren
  } else {
    this.otvoreniIndex = index;
  }
}
}