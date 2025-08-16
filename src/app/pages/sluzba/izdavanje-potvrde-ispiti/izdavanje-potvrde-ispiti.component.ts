import { Component, inject, OnInit } from '@angular/core';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { StudentNaGodini } from '../../../Model/studentnagodini';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { startWith } from 'rxjs';
import { PohadjanjePredmetaService } from '../../../services/pohadjanje-predmeta.service';
import { PohadjanjePredmeta } from '../../../Model/pohadjanjepredmeta';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Predmet } from '../../../Model/predmet';

@Component({
  selector: 'app-izdavanje-potvrde-ispiti',
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatAutocompleteModule,MatTableModule],
  templateUrl: './izdavanje-potvrde-ispiti.component.html',
  styleUrl: './izdavanje-potvrde-ispiti.component.scss'
})
export class IzdavanjePotvrdeIspitiComponent {
  private fb = inject(FormBuilder);
  studenti: StudentNaGodini[] = [];
  filteredStudenti: StudentNaGodini[] = [];
  polozeniPredmeti: Predmet[] = [];
  displayedColumns: string[] = ['naziv', 'espb', 'brojVezbi', 'brojPredavanja', 'semestar', 'istrazivackiRad'];
  studentControl = new FormControl('', Validators.required);
  form = this.fb.group({
    student: [Number(null), Validators.required]
  });

  constructor(private studentNaGodiniService: StudentNaGodiniService, private pohadjanjePredmetaService: PohadjanjePredmetaService){}

  ngOnInit(): void {
    this.loadData();

    this.studentControl.valueChanges
          .pipe(startWith(''))
          .subscribe(value => {
            const filterValue = value ?? '';
            this.filteredStudenti = this.studenti.filter(m =>
              m.student.osoba.ime.toLowerCase().includes(filterValue) || m.student.osoba.prezime.toLowerCase().includes(filterValue) || m.student.osoba.jmbg.toLowerCase().includes(filterValue)
            );
        });
  }

  loadData(){
    this.studentNaGodiniService.getActive().subscribe({
      next: res => {
        this.studenti = res;
      },
      error: err => {
        console.log('Greška pri učitavanju studenata:', err)
      }
    })
  }

  onStudentSelected(selectedStudent: StudentNaGodini) {
    if (selectedStudent) {
      this.studentControl.setValue(`${selectedStudent.student.osoba.ime} ${selectedStudent.student.osoba.prezime} ${selectedStudent.student.osoba.jmbg}`);
      this.form.get('student')?.setValue(selectedStudent.student.id);

      this.pohadjanjePredmetaService.getPolozeniPredmetiByStudentId(selectedStudent.student.id).subscribe({
        next: res => {
          this.polozeniPredmeti = res;
          console.log(this.polozeniPredmeti)
        },
        error: err => {
          console.log('Greška pri učitavanju polozenih predmeta:', err)
        }})
    }
  }

  isSubmitDisabled(): boolean {
    const studentValue = this.form.get('student')?.value;

    if (typeof studentValue === 'object' && studentValue !== null) {
      return true
    }else {
      return false
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const studentId = this.form.get('student')?.value!;
    const student = this.studenti.find(s => s.student.id === studentId)?.student.osoba;

    if (!student) return;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text('Uverenje o položenim ispitima', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const text = `Ovim se potvrdjuje da je student ${student.ime} ${student.prezime}, JMBG: ${student.jmbg}, uspesno polozio sledece ispite:`;
    
    const splitText = doc.splitTextToSize(text, 170); // 170 = max width in points (approx)

    doc.text(splitText, 20, 35);

    const headers = [['Naziv', 'ESPB', 'Broj vežbi', 'Broj predavanja', 'Semestar', 'Istrazivacki rad']];
    const data = this.polozeniPredmeti.map(predmet => [
    predmet.naziv,
    predmet.espb,
    predmet.brojVezbi,
    predmet.brojPredavanja,
    predmet.brojSemestara,
    predmet.istrazivackiRad ? 'Da' : 'Ne'
  ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 45
    });

    const finalY = (doc as any).lastAutoTable.finalY || 60;
    const today = new Date();
const formattedDate = today.toLocaleDateString('sr-RS', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

  doc.text(`Datum izdavanja: ${formattedDate}`, 20, finalY+15);

    doc.save(`Uverenje_${student.ime}_${student.prezime}_${student.jmbg}.pdf`);
  }
}
