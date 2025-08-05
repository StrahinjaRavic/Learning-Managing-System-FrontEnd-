import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../services/student.service';
import { Predmet } from '../../../../Model/predmet';
import { AuthService } from '../../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-predmeti',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './student-predmeti.component.html',
  styleUrls: ['./student-predmeti.component.scss']
})
export class StudentPredmetiComponent implements OnInit {
  predmeti: Predmet[] = [];
  loading = false;
  error = '';

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  const username = this.authService.getUsernameFromToken();
  if (!username) {
    console.error('Nije pronađen username u tokenu.');
    return;
  }
  console.log(username)

  this.authService.getStudentIdByUsername(username).subscribe({
    next: (studentId) => {
      if (studentId !== null && studentId !== undefined) {
        this.loading = true;
        this.studentService.getPredmetiZaStudentaKojeSlusa(studentId).subscribe({
          next: (data) => {
            this.predmeti = data;
            this.loading = false;
          },
          error: () => {
            this.error = 'Greška pri učitavanju predmeta.';
            this.loading = false;
          }
        });
      } else {
        this.error = 'Niste prijavljeni kao student.';
      }
    },
    error: () => {
      this.error = 'Greška pri dohvatanju ID studenta.';
    }
  });
}
}
