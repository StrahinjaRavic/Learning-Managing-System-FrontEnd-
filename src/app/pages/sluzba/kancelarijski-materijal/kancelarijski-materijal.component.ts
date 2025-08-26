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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatTableModule],
  templateUrl: './kancelarijski-materijal.component.html',
  styleUrls: ['./kancelarijski-materijal.component.scss']
})
export class KancelarijskiMaterijalComponent implements OnInit {
  materijali: KancelarijskiMaterijal[] = [];
  noviMaterijal: KancelarijskiMaterijal = { naziv: '', kolicina: 0, opis: '', datumNarudzbine: '', radnik: '', status: 'uToku' };
  izmenaId?: string;
  pretraga: string = ''; // polje za pretragu

  constructor(
    private materijalService: KancelarijskiMaterijalService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.ucitajMaterijale();
  }

  ucitajMaterijale(): void {
    this.materijalService.getAll().subscribe(data => this.materijali = data);
  }

  dodajMaterijal(): void {
    // automatski datum danas
    this.noviMaterijal.datumNarudzbine = new Date().toISOString().split('T')[0];

    this.noviMaterijal.radnik = this.authService.getUsernameFromToken() ?? '';

    this.materijalService.create(this.noviMaterijal).subscribe(() => {
      this.ucitajMaterijale();
      this.noviMaterijal = { naziv: '', kolicina: 0, opis: '', datumNarudzbine: '', radnik: '', status: 'uToku' };
    });
  }

  obrisiMaterijal(id?: string): void {
    if (!id) return;
    this.materijalService.delete(id).subscribe(() => this.ucitajMaterijale());
  }

  podesiZaIzmenu(materijal: KancelarijskiMaterijal): void {
    this.izmenaId = materijal.id;
    this.noviMaterijal = { ...materijal };
  }

  izmeniMaterijal(): void {
    if (!this.izmenaId) return;

    this.noviMaterijal.radnik = this.authService.getUsernameFromToken() ?? '';
    
    this.materijalService.update(this.izmenaId, this.noviMaterijal).subscribe(() => {
      this.ucitajMaterijale();
      this.noviMaterijal = { naziv: '', kolicina: 0, opis: '', datumNarudzbine: '', radnik: '', status: 'uToku' };
      this.izmenaId = undefined;
    });
  }

  // filtrira materijale po svim atributima
  filtriraniMaterijali(): KancelarijskiMaterijal[] {
    if (!this.pretraga) return this.materijali;
    const text = this.pretraga.toLowerCase();
    return this.materijali.filter(m =>
      m.naziv?.toLowerCase().includes(text) ||
      m.kolicina?.toString().includes(text) ||
      m.opis?.toLowerCase().includes(text) ||
      m.radnik?.toLowerCase().includes(text) ||
      m.status?.toLowerCase().includes(text)
    );
  }
}
