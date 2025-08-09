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
import { SilabusService } from '../../../../services/silabus.service';
import { Silabus } from '../../../../Model/silabus';
import { forkJoin } from 'rxjs';

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
  silabusi: Silabus[] = [];

  constructor(
    private route: ActivatedRoute,
    private programService: StudijskiProgramService,
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private sifarnikService: SifarnikService,
    private silabusService: SilabusService
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

    forkJoin({
      silabusi: this.silabusService.getActive(),
      realizacije: this.realizacijaPredmetaService.getRealizacijaByStudijskiProgramId(id)
    }).subscribe(({ silabusi, realizacije }) => {
      this.silabusi = silabusi;
      this.realizacijePredmeta = realizacije;

      this.poveziSilabuse();
    });
  }

  poveziSilabuse(): void {
  this.realizacijePredmeta.forEach(realizacija => {
    const matchedSilabus = this.silabusi.find(s =>
      s.predmet?.id === realizacija.predmet?.id
    );
    if (matchedSilabus) {
      (realizacija as any).silabus = matchedSilabus;
    }
  });
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
    if (this.otvoreniIndex === index) {
      this.otvoreniIndex = null; 
    } else {
      this.otvoreniIndex = index;
    }
  }
}