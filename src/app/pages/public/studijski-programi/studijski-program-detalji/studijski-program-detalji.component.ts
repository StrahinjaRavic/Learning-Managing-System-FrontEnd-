import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudijskiProgram } from './../../../../Model/studijskiprogram';
import { StudijskiProgramService } from './../../../../services/studijski-program.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-studijski-program-detalji',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatListModule],
  templateUrl: './studijski-program-detalji.component.html',
  styleUrls: ['./studijski-program-detalji.component.scss']
})
export class StudijskiProgramDetaljiComponent implements OnInit {
  program?: StudijskiProgram;

  constructor(
    private route: ActivatedRoute,
    private programService: StudijskiProgramService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.programService.getById(id).subscribe({
        next: (data) => (this.program = data),
        error: (err) => console.error('Greška prilikom učitavanja podataka', err),
      });
    }
  }
}
