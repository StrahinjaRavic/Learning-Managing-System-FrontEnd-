import { Component, OnInit } from '@angular/core';
import { Predmet } from '../../../../Model/predmet';
import { StudentService } from '../../../../services/student.service';
import { AuthService } from '../../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-predmeti',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './student-predmeti.component.html',
  styleUrls: ['./student-predmeti.component.scss']
})
export class StudentPredmetiComponent implements OnInit {
  predmeti: Predmet[] = [];
  displayedColumns: string[] = ['naziv', 'espb', 'silabus'];

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getLoggedInUserId();
    if (id !== null) {
      this.studentService.getPredmetiZaStudenta(id).subscribe({
        next: (predmeti) => {
          this.predmeti = predmeti;
        },
        error: (err) => {
          console.error('Greška pri učitavanju predmeta:', err);
        }
      });
    } else {
      console.error('Nema ulogovanog korisnika');
    }
  }
}
