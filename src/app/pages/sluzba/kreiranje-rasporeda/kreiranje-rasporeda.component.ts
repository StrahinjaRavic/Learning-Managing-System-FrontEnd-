import { Component, OnInit } from '@angular/core';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { RealizacijaPredmeta } from '../../../Model/realizacijapredmeta';
import { TerminCreateDTO } from '../../../Model/DTO/TerminCreateDTO';
import { TerminService } from '../../../services/termin.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kreiranje-rasporeda',
  imports: [CommonModule,FormsModule,MatSelectModule,MatFormFieldModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,MatIconModule],
  templateUrl: './kreiranje-rasporeda.component.html',
  styleUrl: './kreiranje-rasporeda.component.scss'
})
export class KreiranjeRasporedaComponent implements OnInit{

  datumOd: Date | null = null;
  datumDo: Date | null = null;
  godinaStudijaId!: number;

  dani: string[] = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak'];

  vremenskiSlotovi = [
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' },
    { start: '12:00', end: '13:00' },
    { start: '13:00', end: '14:00' },
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' },
    { start: '16:00', end: '17:00' },
    { start: '17:00', end: '18:00' },
  ];

  realizacijePredmeta: any[] = [];

  raspored: { [dan: string]: { [vreme: string]: number | null } } = {};

  constructor(private realizacijaService: RealizacijaPredmetaService,private route: ActivatedRoute, private terminService: TerminService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.godinaStudijaId = +params.get('godinaStudijaId')!;
    });

    for (let dan of this.dani) {
      this.raspored[dan] = {};
      for (let slot of this.vremenskiSlotovi) {
        const vreme = `${slot.start}-${slot.end}`;
        this.raspored[dan][vreme] = null;
      }
    }

    this.realizacijaService.getRealizacijaByGodinaStudijaId(this.godinaStudijaId).subscribe((data: RealizacijaPredmeta[]) => {
      this.realizacijePredmeta = data;
    });
  }

  posaljiRaspored() {

    if (!this.datumOd || !this.datumDo) {
      alert('Molimo izaberite vremenski period važenja rasporeda.');
      return;
    }

    const terminiZaBackend: TerminCreateDTO[] = [];

    const daniMap = new Map([
      ['Ponedeljak', 1],
      ['Utorak', 2],
      ['Sreda', 3],
      ['Četvrtak', 4],
      ['Petak', 5],
    ]);

    const currentDate = new Date(this.datumOd);
    const endDate = new Date(this.datumDo);

    while (currentDate <= endDate) {
      const danUNedelji = currentDate.getDay();
      
      for (let [nazivDana, brojDana] of daniMap.entries()) {
        if (danUNedelji === brojDana) {
          for (let slot of this.vremenskiSlotovi) {
            const vreme = `${slot.start}-${slot.end}`;
            const realizacijaId = this.raspored[nazivDana][vreme];

            if (realizacijaId) {
              terminiZaBackend.push({
                datum: currentDate.getFullYear() + '-' +
                      String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
                      String(currentDate.getDate()).padStart(2, '0'),
                vremePocetka: slot.start,
                vremeKraja: slot.end,
                realizacijaPredmeta_id: realizacijaId
              });
            }
          }
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    for(let termin of terminiZaBackend){
      this.terminService.create(termin).subscribe({
        next: response => {

        },
        error: err => {
          console.log("Greska pri kreiranju termina:", err)
        }
      })
    }
    console.log(terminiZaBackend)
  }
}
