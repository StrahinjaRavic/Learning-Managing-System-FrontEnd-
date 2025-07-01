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
  templateUrl: './istorija-studiranja.component.html',
  styleUrls: ['./istorija-studiranja.component.scss']
})
export class IstorijaStudiranjaComponent implements OnInit {
  predmeti: Predmet[] = [];
  loading = false;
  error = '';

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //const studentId = this.authService.getLoggedInUserId();
    const studentId = 1;
    console.log(studentId)

    if (studentId) {
      this.loading = true;
      this.studentService.getGotoviPredmetiZaStudenta(studentId).subscribe({
        next: (data) => {
          this.predmeti = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Greška pri učitavanju predmeta.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Niste prijavljeni kao student.';
    }
  }
}
