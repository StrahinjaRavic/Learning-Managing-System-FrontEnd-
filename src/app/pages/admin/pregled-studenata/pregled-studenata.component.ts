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
import { Student } from '../../../Model/student';
import { StudentService } from '../../../services/student.service';
import { Router, RouterModule } from '@angular/router';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { StudentNaGodini } from '../../../Model/studentnagodini';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pregled-studenata',
  imports: [CommonModule,MatFormFieldModule,MatCardModule,MatMenuModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,FormsModule,MatTableModule,MatInputModule,RouterModule],
  templateUrl: './pregled-studenata.component.html',
  styleUrl: './pregled-studenata.component.scss'
})
export class PregledStudenataComponent implements OnInit{

  studenti: Student[] = []
  filteredStudenti: Student[] = []
  displayedColumns: string[] = ['ime', 'prezime', 'jmbg', 'akcije'];
  studentNaGodini: StudentNaGodini[] = [];

  filter = {
    ime: '',
    prezime: '',
    obrisano: false
  };

  constructor(private studentService: StudentService,private studentNaGodiniService: StudentNaGodiniService,private router: Router,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.studentService.getAll().subscribe({
      next: res => {
        this.studenti = res;
        this.applyFilter();
      }
    })
  }

  applyFilter(){

    this.filteredStudenti = this.studenti.filter(student => {
      const imeMatch = this.filter.ime ? student.osoba.ime.toLowerCase().includes(this.filter.ime.toLowerCase()) : true;
      const prezimeMatch = this.filter.prezime ? student.osoba.prezime.toLowerCase().includes(this.filter.prezime.toLowerCase()) : true;
      const obrisanoMatch = this.filter.obrisano || !student.obrisano;

      return imeMatch && prezimeMatch && obrisanoMatch;
    });
  }
  
  navigiraj(id: number){
    this.studentNaGodiniService.getByStudentId(id).subscribe({
      next: res => {
        this.studentNaGodini = res;
      }
    })
  }

  openStudentDetalji(godinaId: number) {
    this.router.navigate(['/student-detalji', godinaId]);
  }
  
  vrati(student: Student){

    this.studentService.restore(student.id!).subscribe({
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
    
  obrisi(student: Student){
    const confirmed = confirm(`Da li ste sigurni da želite da obrišete studenta: "${student.osoba.ime}"?`);
    if (!confirmed) return;

    this.studentService.delete(student.id!).subscribe({
      next: () => {
        this.loadData();
        this.snackBar.open('Student uspešno obrisan.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju korisnickog naloga.', 'Zatvori', { duration: 3000 });
      }
    });
  }
  
  generateXML(){
    const xmlItems = this.studenti.map(student => `
      <student>
        <id>${student.id}</id>
        <ime>${this.escapeXml(student.osoba.ime)}</ime>
        <prezime>${this.escapeXml(student.osoba.prezime)}</prezime>
        <jmbg>${this.escapeXml(student.osoba.jmbg)}</jmbg>
        <obrisano>${student.obrisano}</obrisano>
      </student>`).join('');

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <studenti>${xmlItems}
    </studenti>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studenti.xml';
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
          body: this.studenti.map(s => [
            s.id,
            s.osoba.ime,
            s.osoba.prezime,
            s.osoba.jmbg,
            s.obrisano ? 'Da' : 'Ne'
          ]),
          startY: 20
        });
    
        doc.save('studenti.pdf');
  }
}
