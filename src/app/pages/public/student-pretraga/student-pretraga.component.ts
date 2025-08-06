import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { StudentNaGodini } from '../../../Model/studentnagodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

@Component({
  selector: 'app-student-pretraga',
  templateUrl: './student-pretraga.component.html',
  styleUrls: ['./student-pretraga.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatButtonModule
  ]
})
export class StudentPretragaComponent implements OnInit {
  searchControl = new FormControl('');
  suggestions: StudentNaGodini[] = [];

  @Output() studentSelected = new EventEmitter<StudentNaGodini>();

  constructor(private studentService: StudentNaGodiniService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.studentService.searchText(value ?? ''))
      )
      .subscribe((results) => {
        this.suggestions = results;
      });
  }

  selectStudent(student: StudentNaGodini): void {
    this.studentSelected.emit(student);
    this.searchControl.setValue(''); // resetuje input posle izbora
    this.suggestions = []; // resetuje sugestije
  }
}