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
import { KorisnikEditComponent } from './korisnik-edit/korisnik-edit.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-administracija-registrovanih-korisnika',
  imports: [CommonModule,MatTableModule, MatButtonModule, MatIconModule, MatCardModule,MatMenuModule,FormsModule,MatFormFieldModule,MatInputModule,MatCheckboxModule],
  templateUrl: './administracija-registrovanih-korisnika.component.html',
  styleUrl: './administracija-registrovanih-korisnika.component.scss'
})
export class AdministracijaRegistrovanihKorisnikaComponent implements OnInit{
  constructor(private Service: UlogovaniKorisnikService,private pravoService: PravoPristupaService, private snackBar: MatSnackBar,private dialog: MatDialog){}

  ulogovaniKorisnici: UlogovaniKorisnik[] = [];
  sviUlogovaniKorisnici: UlogovaniKorisnik[] = [];
  displayedColumns: string[] = ['id','korisnickoIme', 'lozinka', 'email', 'obrisano', 'pravaPristupa','akcije'];
  pravaPristupa:PravoPristupa[] = []

  filter = {
    korisnickoIme: '',
    email: '',
    obrisano: false
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.Service.getAll().subscribe({
      next: res => {
        this.sviUlogovaniKorisnici = res;
        this.applyFilter()
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

  applyFilter() {
    const korisnickoIme = this.filter.korisnickoIme.toLowerCase();
    const email = this.filter.email.toLowerCase();

    this.ulogovaniKorisnici = this.sviUlogovaniKorisnici.filter(s =>
      (s.korisnickoIme?.toLowerCase() ?? '').includes(korisnickoIme) &&
      (s.email?.toLowerCase() ?? '').includes(email) &&
      (this.filter.obrisano || !s.obrisano)
    );
  }

  izmeni(korisnik: UlogovaniKorisnik){
    const dialogRef = this.dialog.open(KorisnikEditComponent, {
      width: '400px',
      data: {...korisnik}
    });

    dialogRef.afterClosed().subscribe((result: UlogovaniKorisnik | undefined) => {
          if (result) {
            this.Service.update(result.id!, result).subscribe({
              next: updated => {
                
                const index = this.ulogovaniKorisnici.findIndex(p => p.id === updated.id);
                if (index !== -1) {
                  this.ulogovaniKorisnici[index] = updated;
                  this.ulogovaniKorisnici = [...this.ulogovaniKorisnici];
                }
              },
              error: err => {
                console.error('Greška pri ažuriranju:', err);
              }
            });
          }
        });
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
        korisnik_id: korisnik.id
      }
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Lista Registrovanih Korisnika', 14, 15);

    const rows = this.ulogovaniKorisnici.map(korisnik => [
      korisnik.id,
      korisnik.korisnickoIme,
      korisnik.lozinka || '-',
      korisnik.email,
      korisnik.obrisano ? 'Da' : 'Ne'
    ]);

    autoTable(doc, {
      head: [['ID', 'Korisničko ime', 'Lozinka', 'Email', 'Obrisano']],
      body: rows,
      startY: 25
    });

    doc.save('registrovani_korisnici.pdf');
  }

  generateXML() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<korisnici>\n`;

    this.ulogovaniKorisnici.forEach(k => {
      xml += `  <korisnik>\n`;
      xml += `    <id>${k.id}</id>\n`;
      xml += `    <korisnickoIme>${this.escapeXml(k.korisnickoIme)}</korisnickoIme>\n`;
      xml += `    <lozinka>${this.escapeXml(k.lozinka || '')}</lozinka>\n`;
      xml += `    <email>${this.escapeXml(k.email)}</email>\n`;
      xml += `    <obrisano>${k.obrisano}</obrisano>\n`;
      xml += `  </korisnik>\n`;
    });

    xml += `</korisnici>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrovani_korisnici.xml';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

}
