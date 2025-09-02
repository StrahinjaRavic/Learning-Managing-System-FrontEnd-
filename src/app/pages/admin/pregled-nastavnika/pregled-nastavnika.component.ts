import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NastavnikService } from '../../../services/nastavnik.service';
import { Nastavnik } from '../../../Model/nastavnik';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NastavnikEditComponent } from './nastavnik-edit/nastavnik-edit.component';
import { NastavnikCreateDTO } from '../../../Model/DTO/NastavnikCreateDTO';

@Component({
  selector: 'app-pregled-nastavnika',
  imports: [CommonModule,MatFormFieldModule,MatCardModule,MatMenuModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,FormsModule,MatTableModule,MatInputModule],
  templateUrl: './pregled-nastavnika.component.html',
  styleUrl: './pregled-nastavnika.component.scss'
})
export class PregledNastavnikaComponent implements OnInit{

  nastavnici: Nastavnik[] = []
  filteredNastavnici: Nastavnik[] = []
  displayedColumns: string[] = ['ime', 'prezime', 'jmbg', 'akcije'];

  filter = {
    ime: '',
    prezime: '',
    obrisano: false
  };

  constructor(private nastavnikService: NastavnikService,private snackBar: MatSnackBar,private dialog: MatDialog){}


  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.nastavnikService.getAll().subscribe({
      next: res => {
        this.nastavnici = res;
        this.applyFilter();
      }
    })
  }

  applyFilter(){

    this.filteredNastavnici = this.nastavnici.filter(nastavnik => {
      const imeMatch = this.filter.ime ? nastavnik.osoba.ime.toLowerCase().includes(this.filter.ime.toLowerCase()) : true;
      const prezimeMatch = this.filter.prezime ? nastavnik.osoba.prezime.toLowerCase().includes(this.filter.prezime.toLowerCase()) : true;
      const obrisanoMatch = this.filter.obrisano || !nastavnik.obrisano;

      return imeMatch && prezimeMatch && obrisanoMatch;
    });
  }

  dodaj(){
    const dialogRef = this.dialog.open(NastavnikEditComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: NastavnikCreateDTO | undefined) => {
      if (result) {
        console.log(result)
        this.nastavnikService.create(result).subscribe({
          next: res => {
            console.log("Uspesno kreiran nastavnik")
          },
          error: err => {
            console.log("Greska pri kreiranju profesora")
          }
        })
      }
    });
  }

  vrati(nastavnik: Nastavnik){
    this.nastavnikService.restore(nastavnik.id!).subscribe({
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
  
  obrisi(nastavnik: Nastavnik){

    const confirmed = confirm(`Da li ste sigurni da želite da obrišete nastavnika: "${nastavnik.osoba.ime}"?`);
    if (!confirmed) return;

    this.nastavnikService.delete(nastavnik.id!).subscribe({
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

  generateXML(){
    const xmlItems = this.nastavnici.map(nastavnik => `
      <nastavnik>
        <id>${nastavnik.id}</id>
        <ime>${this.escapeXml(nastavnik.osoba.ime)}</ime>
        <prezime>${this.escapeXml(nastavnik.osoba.prezime)}</prezime>
        <jmbg>${this.escapeXml(nastavnik.osoba.jmbg)}</jmbg>
        <biografija>${this.escapeXml(nastavnik.biografija)}</biografija>
        <obrisano>${nastavnik.obrisano}</obrisano>
      </nastavnik>`).join('');

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <nastavnici>${xmlItems}
    </nastavnici>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nastavnici.xml';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  escapeXml(unsafe: string): string {
    return unsafe?.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    }) || '';
  }

  generatePDF(){
    const doc = new jsPDF();
        
            autoTable(doc, {
              head: [['ID', 'Ime', 'Prezime', 'Jmbg']],
              body: this.nastavnici.map(s => [
                s.id,
                s.osoba.ime,
                s.osoba.prezime,
                s.osoba.jmbg,
                s.obrisano ? 'Da' : 'Ne'
              ]),
              startY: 20
            });
        
            doc.save('nastavnici.pdf');
  }
}
