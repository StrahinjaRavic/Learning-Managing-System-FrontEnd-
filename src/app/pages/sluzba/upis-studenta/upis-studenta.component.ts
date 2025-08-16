import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { StudentService } from '../../../services/student.service';
import { GodinaStudija } from '../../../Model/godinastudija';
import { GodinaStudijaService } from '../../../services/godina-studija.service';
import { StudentNaGodiniCreateDTO } from '../../../Model/DTO/StudentNaGodiniCreateDTO';
import { Student } from '../../../Model/student';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upis-studenta',
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatAutocompleteModule,MatCheckboxModule,MatRadioModule],
  templateUrl: './upis-studenta.component.html',
  styleUrl: './upis-studenta.component.scss'
})
export class UpisStudentaComponent implements OnInit{

  
  private fb = inject(FormBuilder);
  constructor(private studentService: StudentService, private godinaStudijaService: GodinaStudijaService, private studentNaGodiniService: StudentNaGodiniService, private router: Router){}

  studentControl = new FormControl('', Validators.required);
  godinaControl = new FormControl('',Validators.required)
  godineStudija: GodinaStudija[] = [];
  filteredGodineStudija: GodinaStudija[] = [];
  studenti: Student[] = [];
  filteredStudenti: Student[] = [];

  form = this.fb.group({
    godinaStudija: [Number(null), Validators.required],
    student: [Number(null), Validators.required]
  });

  ngOnInit(): void {
    this.loadData();

    this.studentControl.valueChanges
      .pipe(startWith(''))
      .subscribe(value => {
        const filterValue = value ?? '';
        this.filteredStudenti = this.studenti.filter(m =>
          m.osoba.ime.toLowerCase().includes(filterValue) || m.osoba.prezime.toLowerCase().includes(filterValue) || m.osoba.jmbg.toLowerCase().includes(filterValue)
        );
    });

    this.godinaControl.valueChanges
      .pipe(startWith(''))
      .subscribe(value => {
        const filterValue = value ?? '';
        this.filteredGodineStudija = this.godineStudija.filter(m =>
          m.godina.toLowerCase().includes(filterValue) || m.studijskiProgram.naziv.toLowerCase().includes(filterValue)
        );
      });
  }

  onOsobaSelected(selectedStudent: Student) {
    if (selectedStudent) {
      this.studentControl.setValue(`${selectedStudent.osoba.ime} ${selectedStudent.osoba.prezime} ${selectedStudent.osoba.jmbg}`);
      this.form.get('student')?.setValue(selectedStudent.id);
    }
  }

  onGodinaSelected(selectedGodina: GodinaStudija) {
  if (selectedGodina) {
    this.godinaControl.setValue(`${selectedGodina.studijskiProgram.naziv} - ${selectedGodina.godina}`);
    this.form.get('godinaStudija')?.setValue(selectedGodina.id);
  }
}

  loadData(){
    this.studentService.getAll().subscribe({
      next: res => {
        this.studenti  = res;
      },
      error: err => {
        console.error('Greška pri učitavanju studenata:', err);
      }
    });

    this.godinaStudijaService.getActive().subscribe({
      next: res => {
        this.godineStudija  = res;
      },
      error: err => {
        console.error('Greška pri učitavanju godina Studija:', err);
      }
    });
  }

  isSubmitDisabled(): boolean {
    const studentValue = this.form.get('student')?.value;
    const godinaValue = this.form.get('godinaStudija')?.value;

    if (typeof studentValue === 'object' && studentValue !== null && typeof godinaValue === 'object' && godinaValue !== null) {
      return true
    }else {
      return false
    }
  }

  goToKreiranjeStudenta() {
    this.router.navigate(['/kreiranje-studenta']);
  }

  onSubmit(){
    if (this.form.invalid) return;

    const studentNaGodini: StudentNaGodiniCreateDTO = {
      student_id: this.form.get('student')?.value!,
      godinaStudija_id: this.form.get('godinaStudija')?.value!,
    }

    this.studentNaGodiniService.create(studentNaGodini).subscribe({
      next: response => {
        console.log('student uspesno upisan:', response);
      },
      error: err => {
        console.error('greska pri upisu studenta:', err);
      }
    });
  }
}
