import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rok } from '../../../Model/rok';
import { RokService } from '../../../services/rok.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; // ako koristiš datepicker
import { KreiranjeRokaEditComponent } from './kreiranje-roka-edit/kreiranje-roka-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-kreiranje-roka',
  imports: [CommonModule, MatTableModule, MatCardModule,MatIconModule,MatButtonModule,MatFormFieldModule,MatMenuModule,MatDatepickerModule,MatCheckboxModule,FormsModule,MatNativeDateModule,MatInputModule,RouterModule],
  templateUrl: './kreiranje-roka.component.html',
  styleUrl: './kreiranje-roka.component.scss'
})
export class KreiranjeRokaComponent implements OnInit{

  rokovi: Rok[] = []
  filteredRokovi: Rok[] = [];
  displayedColumns: string[] = ['naziv', 'pocetak', 'kraj', 'akcije', 'pregledaj'];
  filter = {
    naziv: '',
    pocetak: null,
    kraj: null,
    obrisano: false
  };

  constructor(private rokService: RokService, private snackBar: MatSnackBar,private dialog: MatDialog){}


  ngOnInit(): void {
    this.loadData();
  }

  loadData(){

    this.rokService.getAll().subscribe({
      next: res => {
        this.rokovi = res
        this.applyFilter()
      },
      error: err => {
        console.log("Greska pri ucitavanju rokova:", err)
      }
    })
  }

  applyFilter() {
  this.filteredRokovi = this.rokovi.filter(rok => {
    const nazivMatch = this.filter.naziv ? rok.naziv.toLowerCase().includes(this.filter.naziv.toLowerCase()) : true;
    const obrisanoMatch = this.filter.obrisano || !rok.obrisano;

    let pocetakMatch = true;
    if (this.filter.pocetak) {
      const filterDate = new Date(this.filter.pocetak).setHours(0, 0, 0, 0);
      const rokDate = new Date(rok.pocetak).setHours(0, 0, 0, 0);
      pocetakMatch = rokDate >= filterDate;
    }

    let krajMatch = true;
    if (this.filter.kraj) {
      const filterDate = new Date(this.filter.kraj).setHours(0, 0, 0, 0);
      const rokDate = new Date(rok.kraj).setHours(0, 0, 0, 0);
      krajMatch = rokDate <= filterDate;
    }

    return nazivMatch && pocetakMatch && krajMatch && obrisanoMatch;
  });
}

  dodaj(){
    const dialogRef = this.dialog.open(KreiranjeRokaEditComponent, {
      width: '700px',
      data: {
        rok:{
          naziv: '',
          pocetak: null,
          kraj:null
        },
        title: 'Kreiraj Rok'
      },
    });

    dialogRef.afterClosed().subscribe((result: Rok | undefined) => {
          if (result) {
            this.rokService.create(result).subscribe({
              next: updated => { 
                this.filteredRokovi.push(updated)
                this.filteredRokovi = [...this.filteredRokovi];
              },
              error: err => {
                console.error('Greška pri kreiranju:', err);
              }
            });
          }
        });
  }

  izmeni(rok: Rok){
    const dialogRef = this.dialog.open(KreiranjeRokaEditComponent, {
      width: '700px',
      data: { rok:{...rok},title: 'Izmeni Rok' }
    });

    dialogRef.afterClosed().subscribe((result: Rok | undefined) => {
      if (result) {
        console.log(result)
        this.rokService.update(result.id!, result).subscribe({
          next: updated => {
                
            const index = this.filteredRokovi.findIndex(p => p.id === updated.id);
            if (index !== -1) {
              this.filteredRokovi[index] = updated;
              this.filteredRokovi = [...this.filteredRokovi];
            }
          },
          error: err => {
            console.error('Greška pri ažuriranju:', err);
          }
        });
      }
    });
  }

  obrisi(rok: Rok){
    const confirmed = confirm(`Da li ste sigurni da želite da obrišete Rok: "${rok.naziv}"?`);
    if (!confirmed) return;

    this.rokService.delete(rok.id!).subscribe({
      next: () => {
        this.loadData();
        this.snackBar.open('Rok uspešno obrisan.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju roka.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  vrati(rok: Rok){
    this.rokService.restore(rok.id!).subscribe({
      next: () => {
        this.loadData();
        this.snackBar.open('Rok uspešno vracen.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri vracanju roka.', 'Zatvori', { duration: 3000 });
      }
    });
  }
}
