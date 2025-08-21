import { Component, OnInit } from '@angular/core';
import { PrijavaPolaganjaService } from '../../../services/prijava-polaganja.service';
import { Polaganje } from '../../../Model/polaganje';
import { PrijavaPolaganja } from '../../../Model/prijavapolaganja';
import { PrijavaPolaganjaSaveDTO } from '../../../Model/DTO/PrijavaPolaganjaSaveDTO';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prijava-polaganja',
  templateUrl: './prijava-polaganja.component.html',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterLink],
})
export class PrijavaPolaganjaComponent implements OnInit {
  polaganja: Polaganje[] = [];
  aktivnePrijave: PrijavaPolaganja[] = [];
  studentId: number = 0;
  prijavaStatus: { [key: number]: string } = {};

  constructor(
    private prijavaPolaganjaService: PrijavaPolaganjaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getUsernameFromToken();

    if (username) {
      this.authService.getStudentIdByUsername(username).subscribe({
        next: (studentId) => {
          if (studentId) {
            this.studentId = studentId;
            this.ucitajDostupnaPolaganja();
            this.ucitajAktivnePrijave();
          } else {
            console.error('Student ID nije pronađen.');
          }
        },
        error: (err) => console.error('Greška pri dohvatanju studentId:', err),
      });
    } else {
      console.error('Username nije pronađen u tokenu.');
    }
  }

  ucitajDostupnaPolaganja(): void {
    if (!this.studentId) return;

    this.prijavaPolaganjaService.getDostupnaPolaganja(this.studentId).subscribe({
      next: (data) => {
        this.polaganja = data;
        console.log('Polaganja:', data);
      },
      error: (err) => console.error('Greška prilikom dohvatanja polaganja', err),
    });
  }

  ucitajAktivnePrijave(): void {
    if (!this.studentId) return;

    this.prijavaPolaganjaService
      .getAktivnePrijaveZaStudenta(this.studentId)
      .subscribe({
        next: (data) => {
          this.aktivnePrijave = data;
          console.log('Aktivne prijave:', data);
        },
        error: (err) =>
          console.error('Greška prilikom dohvatanja aktivnih prijava', err),
      });
  }

  prijavi(polaganjeId: number): void {
    const dto: PrijavaPolaganjaSaveDTO = {
      studentId: this.studentId,
      polaganjeId: polaganjeId,
    };

    this.prijavaStatus[polaganjeId] = 'Prijavljujem...';

    this.prijavaPolaganjaService
      .prijaviIspit(dto.studentId, dto.polaganjeId)
      .subscribe({
        next: () => {
          this.prijavaStatus[polaganjeId] = 'Uspešno prijavljeno!';
          this.ucitajAktivnePrijave(); // osveži listu odmah
        },
        error: (err) => {
          console.error(err);
          this.prijavaStatus[polaganjeId] = 'Greška pri prijavi.';
        },
      });
  }
}
