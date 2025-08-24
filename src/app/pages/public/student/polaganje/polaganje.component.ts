import { Component, OnInit } from '@angular/core';
import { PolaganjeService } from '../../../../services/polaganje.service';
import { ActivatedRoute } from '@angular/router';
import { Polaganje } from '../../../../Model/polaganje';
import { EvaluacijaZadatakaService } from '../../../../services/evaluacija-zadataka.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { Zadatak } from '../../../../Model/zadatak';
import { Odgovor } from '../../../../Model/odgovor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PrijavaPolaganjaService } from '../../../../services/prijava-polaganja.service';
import { PrijavaPolaganja } from '../../../../Model/prijavapolaganja';

@Component({
  selector: 'app-polaganje',
  imports: [CommonModule,MatCardModule,MatRadioModule,MatCheckboxModule,FormsModule,MatButtonModule,MatIconModule],
  templateUrl: './polaganje.component.html',
  styleUrl: './polaganje.component.scss',
  providers: [EvaluacijaZadatakaService]
})
export class PolaganjeComponent implements OnInit{

  predato: boolean = false;
  polaganje_id!: number
  prijavaPolaganja_id!: number
  prijavaPolaganja!: PrijavaPolaganja
  polaganje! : Polaganje
  zadaci: any[] = [];
  odabrani: { [zadatakId: number]: number } = {};
  odabraniCheckbox: { [zadatakId: number]: { [odgId: number]: boolean } } = {};
  bodovi: number = 0;
  ukupnoTacnih: number = 0;
  testVecUradjen: boolean = false;

  constructor(private polaganjeService: PolaganjeService, private route: ActivatedRoute, private service: EvaluacijaZadatakaService, private prijavaService: PrijavaPolaganjaService){}

  ngOnInit(): void {
    this.prijavaPolaganja_id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData(){

    this.prijavaService.getById(this.prijavaPolaganja_id).subscribe({
      next: res => {
        this.prijavaPolaganja = res
        console.log(res)
        this.polaganje = res.polaganje
        this.polaganje_id = res.polaganje.id

        if (this.prijavaPolaganja.brojBodova !== null) {
          this.testVecUradjen = true;
        } else if (this.polaganje.evaluacijaZnanja?.id) {
          this.loadZadaci(this.polaganje.evaluacijaZnanja.id);
        }
      }
    })
  }

   loadZadaci(evaluacijaId: number) {
    this.service.getZadaciZaEvaluaciju(evaluacijaId).subscribe({
      next: res => {

        let sviZadaci = res;

        if (sviZadaci.length > 30) {
          sviZadaci = this.getRandomZadaci(sviZadaci, 30);
        }

        this.zadaci = sviZadaci.map((z: Zadatak) => ({
          ...z,
          visestrukiOdgovori: z.odgovori.filter((o: Odgovor) => o.tacan).length > 1
        }));
        console.log('Zadaci:', this.zadaci);
      }
    });
  }

  private getRandomZadaci(zadaci: Zadatak[], count: number): Zadatak[] {
    return zadaci
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  predaj() {
    this.predato = true;
    this.ukupnoTacnih = 0;
    this.bodovi = 0;

    this.zadaci.forEach(z => {
      const tacniIds = z.odgovori.filter((o: Odgovor) => o.tacan).map((o: Odgovor) => o.id);

      if (!z.visestrukiOdgovori) {
        // radio
        z.rezultat = z.selektovani ? tacniIds.includes(z.selektovani) : false;
      } else {
        // checkbox
        const selektovaniIds = z.odgovori
          .filter((o: Odgovor) => o.selektovan)
          .map((o: Odgovor) => o.id);

        const imaNetacnih = selektovaniIds.some((id: number) => !tacniIds.includes(id));
        const sviTacni = tacniIds.every((id: number) => selektovaniIds.includes(id));

        z.rezultat = !imaNetacnih && sviTacni;
      }

      if (z.rezultat) {
        this.ukupnoTacnih++;
      }
    });

    const vrednostZadatka = 30 / this.zadaci.length;
    this.bodovi = +(this.ukupnoTacnih * vrednostZadatka).toFixed(2);

    this.prijavaPolaganja.brojBodova = this.bodovi
    this.prijavaPolaganja.pohadjanjePredmeta_id = this.prijavaPolaganja.pohadjanjePredmeta.id
    this.prijavaPolaganja.polaganje_id = this.prijavaPolaganja.polaganje.id

    this.prijavaService.update(this.prijavaPolaganja_id, this.prijavaPolaganja).subscribe()
  }



  jeOdabran(z: any, odgId: number): boolean {
    if (!z.visestrukiOdgovori) {
      return this.odabrani[z.id] === odgId;
    } else {
      return this.odabraniCheckbox[z.id]?.[odgId] || false;
    }
  }

}
