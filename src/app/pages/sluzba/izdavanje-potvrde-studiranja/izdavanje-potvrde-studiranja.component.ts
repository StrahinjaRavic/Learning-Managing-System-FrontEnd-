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
import { startWith } from 'rxjs';
import { PDFService } from '../../../services/pdf.service';


@Component({
  selector: 'app-izdavanje-potvrde-studiranja',
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatAutocompleteModule],
  templateUrl: './izdavanje-potvrde-studiranja.component.html',
  styleUrl: './izdavanje-potvrde-studiranja.component.scss'
})
export class IzdavanjePotvrdeStudiranjaComponent implements OnInit{

  private fb = inject(FormBuilder);
  studenti: StudentNaGodini[] = [];
  filteredStudenti: StudentNaGodini[] = [];
  studentControl = new FormControl('', Validators.required);
  form = this.fb.group({
    student: [Number(null), Validators.required]
  });

  constructor(private studentNaGodiniService: StudentNaGodiniService, private pdfService: PDFService){}

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
      this.form.get('student')?.setValue(selectedStudent.id);
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

  onSubmit(){
    if (this.form.invalid) return;
    const student = this.form.get('student')?.value!

    this.pdfService.getUverenje(student).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'uverenje.pdf';
      a.click();
      },
      error: err => {
        console.error('greska pri upisu studenta:', err);
      }
    });
  }

}
