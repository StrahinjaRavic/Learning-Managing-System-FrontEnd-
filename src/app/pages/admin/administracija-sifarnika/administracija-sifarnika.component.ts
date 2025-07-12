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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-administracija-sifarnika',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,MatMenuModule],
  templateUrl: './administracija-sifarnika.component.html',
  styleUrl: './administracija-sifarnika.component.scss'
})
export class AdministracijaSifarnikaComponent implements OnInit{

  sifarnici: Sifarnik[] = []

  constructor(private Service : SifarnikService,private dialog: MatDialog,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.Service.getAll().subscribe({
      next: res => {
        this.sifarnici = res;
      },
      error: err => {
        console.error('Greška pri učitavanju sifarnika:', err);
      }
    });
  }

  obrisi(sifarnik: Sifarnik) {
    this.Service.delete(sifarnik.id).subscribe(() => {
      this.loadData(); 
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
}
