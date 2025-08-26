import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../services/student.service';
import { AuthService } from '../../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { IstorijaStudiranjaDTO } from '../../../../Model/DTO/istorijastudiranjaDTO';
import { IstorijaPredmetaDTO } from '../../../../Model/DTO/istorijapredmetaDTO';

@Component({
  selector: 'app-istorija-studiranja',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './istorija-studiranja.component.html',
  styleUrls: ['./istorija-studiranja.component.scss']
})
export class IstorijaStudiranjaComponent implements OnInit {
  istorija!: IstorijaStudiranjaDTO;
  loading = false;
  error = '';

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('Nije pronađen username u tokenu.');
      return;
    }

    this.authService.getStudentIdByUserId(userId).subscribe({
      next: (studentId) => {
        if (studentId !== null && studentId !== undefined) {
          this.loading = true;
          this.studentService.getIstorijaStudiranja(studentId).subscribe({
            next: (data) => {
              this.istorija = data;
              console.log(data)
              this.loading = false;
            },
            error: () => {
              this.error = 'Greška pri učitavanju istorije studiranja.';
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
