import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { StudentPregledDTO } from '../../../Model/DTO/studentpregledDTO';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-student-detalji',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './student-detalje.component.html',
  styleUrls: ['./student-detalje.component.scss']
})
export class StudentDetaljiComponent implements OnInit {
  student!: StudentPregledDTO;

  constructor(
    private studentService: StudentNaGodiniService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentPregled(id).subscribe(data => {
      this.student = data;
    });
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }
}
