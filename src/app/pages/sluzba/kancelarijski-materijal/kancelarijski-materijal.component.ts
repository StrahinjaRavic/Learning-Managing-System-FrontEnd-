import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KancelarijskiMaterijalService } from '../../../services/kancelarisjki-materijal.service';
import { KancelarijskiMaterijal } from '../../../Model/kancelarijskimaterijal';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-kancelarijski-materijal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTableModule
  ],
  templateUrl: './kancelarijski-materijal.component.html',
  styleUrls: ['./kancelarijski-materijal.component.scss']
})
export class KancelarijskiMaterijalComponent implements OnInit {

  materijali: KancelarijskiMaterijal[] = [];

  noviMaterijal: KancelarijskiMaterijal = this.prazanMaterijal();

  izmenaKey?: string;

  pretraga: string = '';

  constructor(
    private materijalService: KancelarijskiMaterijalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ucitajMaterijale();
  }

  ucitajMaterijale(): void {
    this.materijalService.getAll()
      .subscribe(data => this.materijali = data);
  }

  dodajMaterijal(): void {
    this.noviMaterijal.datumNarudzbine =
      new Date().toISOString().split('T')[0];

    this.noviMaterijal.radnik =
      this.authService.getUsernameFromToken() ?? '';

    this.materijalService.create(this.noviMaterijal)
      .subscribe(() => {
        this.ucitajMaterijale();
        this.resetForm();
      });
  }

  obrisiMaterijal(key?: string): void {
    if (!key) return;

    this.materijalService.delete(key)
      .subscribe(() => this.ucitajMaterijale());
  }

  podesiZaIzmenu(m: KancelarijskiMaterijal): void {
    this.izmenaKey = m._key;
    this.noviMaterijal = { ...m };
  }

  izmeniMaterijal(): void {
    if (!this.izmenaKey) return;

    this.noviMaterijal.radnik =
      this.authService.getUsernameFromToken() ?? '';

    this.materijalService.update(this.izmenaKey, this.noviMaterijal)
      .subscribe(() => {
        this.ucitajMaterijale();
        this.resetForm();
      });
  }

  resetForm(): void {
    this.noviMaterijal = this.prazanMaterijal();
    this.izmenaKey = undefined;
  }

  prazanMaterijal(): KancelarijskiMaterijal {
    return {
      naziv: '',
      kolicina: 0,
      opis: '',
      datumNarudzbine: '',
      radnik: '',
      status: 'Regularno'
    };
  }

  filtriraniMaterijali(): KancelarijskiMaterijal[] {
    if (!this.pretraga) return this.materijali;

    const text = this.pretraga.toLowerCase();

    return this.materijali.filter(m =>
      m.naziv?.toLowerCase().includes(text) ||
      m.kolicina?.toString().includes(text) ||
      m.opis?.toLowerCase().includes(text) ||
      m.radnik?.toLowerCase().includes(text) ||
      m.status?.toLowerCase().includes(text) ||
      m.datumNarudzbine?.toLowerCase().includes(text)
    );
  }
}
