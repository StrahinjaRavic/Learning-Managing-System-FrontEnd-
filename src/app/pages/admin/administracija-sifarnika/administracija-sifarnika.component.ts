import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { Sifarnik } from '../../../Model/sifarnik';
import { SifarnikService } from '../../../services/sifarnik.service';
import { SifarnikEditComponent } from './sifarnik-edit/sifarnik-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-administracija-sifarnika',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,MatMenuModule,FormsModule,MatFormFieldModule,MatInputModule,MatCheckboxModule],
  templateUrl: './administracija-sifarnika.component.html',
  styleUrl: './administracija-sifarnika.component.scss'
})
export class AdministracijaSifarnikaComponent implements OnInit{

  filter = {
    naziv: '',
    tekst: '',
    obrisano: false
  };

  sviSifarnici: Sifarnik[] = [];
  sifarnici: Sifarnik[] = []

  constructor(private Service : SifarnikService,private dialog: MatDialog,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.Service.getAll().subscribe({
      next: res => {
        this.sviSifarnici  = res;
        this.applyFilter();
      },
      error: err => {
        console.error('Greška pri učitavanju sifarnika:', err);
      }
    });
  }

  applyFilter() {
    const naziv = this.filter.naziv.toLowerCase();
    const tekst = this.filter.tekst.toLowerCase();

    this.sifarnici = this.sviSifarnici.filter(s =>
      s.naziv.toLowerCase().includes(naziv) &&
      s.tekst.toLowerCase().includes(tekst) &&
      (this.filter.obrisano || !s.obrisano)
    );
  }

  obrisi(sifarnik: Sifarnik) {

    const confirmed = confirm(`Da li ste sigurni da želite da obrišete sifarnik sa naslovom: "${sifarnik.naziv}"?`);
    if (!confirmed) return;

    this.Service.delete(sifarnik.id).subscribe({
      next: () => {
        this.loadData();
        this.snackBar.open('Sifarnik nalog uspešno obrisan.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju Sifarnika.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  vrati(sifarnik: Sifarnik){
      this.Service.restore(sifarnik.id!).subscribe({
        next: () => {
          this.loadData()
          this.snackBar.open('Sifarnik uspešno vracen.', 'Zatvori', { duration: 3000 });
        },
        error: err => {
          console.error('Greška pri brisanju:', err);
          this.snackBar.open('Greška pri brisanju Sifarnika.', 'Zatvori', { duration: 3000 });
        }
      });
    }

  dodaj(){
    const dialogRef = this.dialog.open(SifarnikEditComponent, {
      width: '800px',
      data: {
        naziv: '',
        tekst: ''
      }
    });
  
    dialogRef.afterClosed().subscribe((result: Sifarnik | undefined) => {
      if (result) {
        this.Service.create(result).subscribe({
          next: updated => { 
            this.sifarnici.push(updated)
            this.sifarnici = [...this.sifarnici];
          },
          error: err => {
            console.error('Greška pri ažuriranju:', err);
          }
        });
      }
    });
  }

  izmeni(sifarnik: Sifarnik){
    const dialogRef = this.dialog.open(SifarnikEditComponent, {
      width: '800px',
      data: {...sifarnik}
    });
  
    dialogRef.afterClosed().subscribe((result: Sifarnik | undefined) => {
      if (result) {
        this.Service.update(result.id!, result).subscribe({
          next: updated => {
                  
            const index = this.sifarnici.findIndex(p => p.id === updated.id);
            if (index !== -1) {
              this.sifarnici[index] = updated;
              this.sifarnici = [...this.sifarnici];
            }
          },
            error: err => {
              console.error('Greška pri ažuriranju:', err);
            }
        });
      }
    });
  }

  generateXML(): void {
    const xmlItems = this.sifarnici.map(sifarnik => `
      <sifarnik>
        <id>${sifarnik.id}</id>
        <naziv>${this.escapeXml(sifarnik.naziv)}</naziv>
        <tekst>${this.escapeXml(sifarnik.tekst)}</tekst>
        <obrisano>${sifarnik.obrisano}</obrisano>
      </sifarnik>`).join('');

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sifarnici>${xmlItems}
    </sifarnici>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sifarnici.xml';
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

  generatePDF(): void {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['ID', 'Naziv', 'Tekst', 'Obrisano']],
      body: this.sifarnici.map(s => [
        s.id,
        s.naziv,
        s.tekst,
        s.obrisano ? 'Da' : 'Ne'
      ]),
      startY: 20
    });

    doc.save('sifarnici.pdf');
  }

  onXMLImport(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // parsiranje dokumenta
    const reader = new FileReader();
    reader.onload = () => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(reader.result as string, 'application/xml');
      const sifarnikElements = Array.from(xmlDoc.getElementsByTagName('sifarnik'));

      // parsiranje sifarnika
      const parsedSifarnici: Sifarnik[] = sifarnikElements.map(el => ({
        id: Number(el.getElementsByTagName('id')[0]?.textContent),
        naziv: el.getElementsByTagName('naziv')[0]?.textContent?.trim() || '',
        tekst: el.getElementsByTagName('tekst')[0]?.textContent?.trim() || '',
        obrisano: el.getElementsByTagName('obrisano')[0]?.textContent?.trim() === 'true'
      }));

      parsedSifarnici.forEach(sifarnik => {
        // provera da li sifarnik sa datim indeksom vec postoji
        const existingIndex = this.sifarnici.findIndex(s => s.id === sifarnik.id);

        if (existingIndex !== -1) {
          // Update ako sifarnik vec postoji
          this.Service.update(sifarnik.id!, sifarnik).subscribe({
            next: updated => {
              this.sifarnici[existingIndex] = updated;
              this.sifarnici = [...this.sifarnici];
            },
            error: err => {
              console.error('Greška pri ažuriranju iz XML-a:', err);
              this.snackBar.open('Greška pri ažuriranju šifarnika.', 'Zatvori', { duration: 3000 });
            }
          });
        } else {
          // Napravi novi ako sifarnik ne postoji
          const sifarnikZaKreiranje = {
            naziv: sifarnik.naziv,
            tekst: sifarnik.tekst,
          };

          this.Service.create(sifarnikZaKreiranje).subscribe({
            next: created => {
              this.sifarnici.push(created);
              this.sifarnici = [...this.sifarnici];
            },
            error: err => {
              console.error('Greška pri kreiranju iz XML-a:', err);
              this.snackBar.open('Greška pri kreiranju šifarnika.', 'Zatvori', { duration: 3000 });
            }
          });
        }
      });
    };
    reader.readAsText(file);
  }
}
