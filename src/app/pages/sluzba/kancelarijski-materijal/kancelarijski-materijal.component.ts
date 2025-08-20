import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KancelarijskiMaterijalService } from '../../../services/kancelarisjki-materijal.service';
import { KancelarijskiMaterijal } from '../../../Model/kancelarijskimaterijal';
import { MatInput, MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-kancelarijski-materijal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule],
  templateUrl: './kancelarijski-materijal.component.html',
  styleUrls: ['./kancelarijski-materijal.component.scss']
})
export class KancelarijskiMaterijalComponent implements OnInit {

  materijali: KancelarijskiMaterijal[] = [];
  noviMaterijal: KancelarijskiMaterijal = { naziv: '', kolicina: 0, opis: '', datumNarudzbine: '', radnik: '', status: 'uToku' };
  izmenaId?: string;
  prikaziIstoriju: boolean = false;
  

  constructor(private materijalService: KancelarijskiMaterijalService) {}

  ngOnInit(): void {
    this.ucitajMaterijale();
  }

  ucitajMaterijale(): void {
    this.materijalService.getAll().subscribe(data => {
      this.materijali = data;
    });
  }

  dodajMaterijal(): void {
    this.materijalService.create(this.noviMaterijal).subscribe(() => {
      this.ucitajMaterijale();
      this.noviMaterijal = { naziv: '', kolicina: 0, opis: '', datumNarudzbine: '', radnik: '', status: 'uToku' };
    });
  }

  obrisiMaterijal(id?: string): void {
    if (!id) return;
    this.materijalService.delete(id).subscribe(() => {
      this.ucitajMaterijale();
    });
  }

  pripremiZaIzmenu(materijal: KancelarijskiMaterijal): void {
    this.izmenaId = materijal.id;
    this.noviMaterijal = { ...materijal };
  }

  izmeniMaterijal(): void {
    if (!this.izmenaId) return;
    this.materijalService.update(this.izmenaId, this.noviMaterijal).subscribe(() => {
      this.ucitajMaterijale();
      this.noviMaterijal = { naziv: '', kolicina: 0, opis: '', datumNarudzbine: '', radnik: '', status: 'uToku' };
      this.izmenaId = undefined;
    });
  }

  toggleIstorija(): void {
    this.prikaziIstoriju = !this.prikaziIstoriju;
  }
  podesiZaIzmenu(materijal: KancelarijskiMaterijal): void {
  this.izmenaId = materijal.id;
  // popuni formu sa vrednostima za izmenu
  this.noviMaterijal = { 
    naziv: materijal.naziv, 
    kolicina: materijal.kolicina, 
    opis: materijal.opis,
    datumNarudzbine: materijal.datumNarudzbine,
    radnik: materijal.radnik,
    status: materijal.status
  };
}
}
