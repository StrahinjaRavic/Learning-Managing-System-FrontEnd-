import { Component, OnInit } from '@angular/core';
import { PrijavaPolaganjaService } from '../../../services/prijava-polaganja.service';
import { Polaganje } from '../../../Model/polaganje';
import { PrijavaPolaganjaSaveDTO } from '../../../Model/DTO/PrijavaPolaganjaSaveDTO';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-prijava-polaganja',
  templateUrl: './prijava-polaganja.component.html',
  standalone: true,
  imports: [DatePipe, CommonModule], // dodaj CommonModule, MatTableModule, MatButtonModule itd. po potrebi
})
export class PrijavaPolaganjaComponent implements OnInit {
  polaganja: Polaganje  [] = [];
  studentId: number = 3; // privremeno hardkodiran, zameni ako koristiš iz tokena itd.
  prijavaStatus: { [key: number]: string } = {}; // za prikaz statusa po dugmetu

  constructor(private PrijavaPolaganjaService: PrijavaPolaganjaService, private authService: AuthService) {}

  ngOnInit(): void {
  const username = this.authService.getUsernameFromToken();

  if (username) {
    this.authService.getStudentIdByUsername(username).subscribe({
      next: studentId => {
        if (studentId) {
          this.studentId = studentId;
          this.ucitajDostupnaPolaganja();
        } else {
          console.error('Student ID nije pronađen.');
        }
      },
      error: err => console.error('Greška pri dohvatanju studentId:', err)
    });
  } else {
    console.error('Username nije pronađen u tokenu.');
  }
}

  ucitajDostupnaPolaganja(): void {

    if (!this.studentId) return;
    

    this.PrijavaPolaganjaService.getDostupnaPolaganja(this.studentId).subscribe({
      next: data => {
        this.polaganja = data;
        console.log('Polaganja:', data);
      },
      error: err => console.error('Greška prilikom dohvatanja polaganja', err)
    });
  }


  prijavi(polaganjeId: number): void {
    const dto: PrijavaPolaganjaSaveDTO = {
      studentId: this.studentId,
      polaganjeId: polaganjeId,
    };

    this.prijavaStatus[polaganjeId] = 'Prijavljujem...';

    this.PrijavaPolaganjaService.prijaviIspit(dto.studentId, dto.polaganjeId).subscribe({
      next: () => {
        this.prijavaStatus[polaganjeId] = 'Uspešno prijavljeno!';
      },
      error: (err) => {
        console.error(err);
        this.prijavaStatus[polaganjeId] = 'Greška pri prijavi.';
      },
    });
  }
}
