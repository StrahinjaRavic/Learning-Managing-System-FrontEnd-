import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentNaGodini } from '../../../Model/studentnagodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-detalji',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './student-detalje.component.html',
  styleUrls: ['./student-detalje.component.scss']
})
export class StudentDetaljiComponent implements OnInit {
  student!: StudentNaGodini;
  constructor(
    private studentService: StudentNaGodiniService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentNaGodiniById(id).subscribe(data => {
      this.student = data;
    });
  }
}
