import { Component, OnInit } from '@angular/core';
import { UlogovaniKorisnikService } from '../../../services/ulogovani-korisnik.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UlogovaniKorisnik } from '../../../Model/ulogovanikorisnik';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PravaDialogComponent } from './prava-dialog/prava-dialog.component';
import { PravoPristupa } from '../../../Model/pravopristupa';
import { PravoPristupaService } from '../../../services/pravo-pristupa.service';

@Component({
  selector: 'app-administracija-registrovanih-korisnika',
  imports: [CommonModule,MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './administracija-registrovanih-korisnika.component.html',
  styleUrl: './administracija-registrovanih-korisnika.component.scss'
})
export class AdministracijaRegistrovanihKorisnikaComponent implements OnInit{
  constructor(private Service: UlogovaniKorisnikService,private pravoService: PravoPristupaService, private snackBar: MatSnackBar,private dialog: MatDialog){}
  ulogovaniKorisnici: UlogovaniKorisnik[] = [];
  displayedColumns: string[] = ['id','korisnickoIme', 'lozinka', 'email', 'obrisano', 'pravaPristupa','akcije'];
  pravaPristupa:PravoPristupa[] = []
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.Service.getAll().subscribe({
      next: res => {
        this.ulogovaniKorisnici = res;
      },
      error: err => {
        console.error('Greška pri učitavanju korisnika:', err);
      }
    });

    this.pravoService.getAll().subscribe({
      next: res => {
        this.pravaPristupa = res;
      },
      error: err => {
        console.error('Greška pri učitavanju korisnika:', err);
      }
    });
  }

  izmeni(korisnik: UlogovaniKorisnik){
    for(korisnik of this.ulogovaniKorisnici){
      console.log(korisnik)
    }
  }

  obrisi(korisnik: UlogovaniKorisnik){

    const confirmed = confirm(`Da li ste sigurni da želite da obrišete korisnicki nalog: "${korisnik.korisnickoIme}"?`);
    if (!confirmed) return;

    this.Service.delete(korisnik.id!).subscribe({
      next: () => {
        this.loadData();
        this.snackBar.open('Korisnicki nalog uspešno obrisan.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju korisnickog naloga.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  vrati(korisnik: UlogovaniKorisnik){
    this.Service.restore(korisnik.id!).subscribe({
      next: () => {
        this.loadData()
        this.snackBar.open('Korisnicki nalog uspešno vracen.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju korisnickog naloga.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  otvoriPravaDialog(korisnik: UlogovaniKorisnik){
    this.dialog.open(PravaDialogComponent, {
    width: '400px',
    data: {
      prava: this.pravaPristupa
    }
  });
  }
}
