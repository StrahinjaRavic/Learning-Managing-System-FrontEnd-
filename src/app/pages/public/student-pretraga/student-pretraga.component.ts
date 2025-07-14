import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentNaGodini } from '../../../Model/studentnagodini';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

@Component({
  selector: 'app-student-pretraga',
  templateUrl: './student-pretraga.component.html',
  styleUrls: ['./student-pretraga.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class StudentPretragaComponent implements OnInit {
  form!: FormGroup;
  rezultati: StudentNaGodini[] = [];
  displayedColumns: string[] = ['ime', 'prezime', 'brojIndeksa', 'godinaUpisa'];

  constructor(
  private fb: FormBuilder,
  private studentNaGodiniService: StudentNaGodiniService
) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      ime: [''],
      prezime: [''],
      brojIndeksa: [''],
      godinaUpisa: ['']
    });
  }

  pretrazi(): void {
  const { ime, prezime, brojIndeksa, godinaUpisa } = this.form.value;

  this.studentNaGodiniService
    .search(ime, prezime, brojIndeksa, godinaUpisa)
    .subscribe(data => {
      this.rezultati = data;
    });
}
}
