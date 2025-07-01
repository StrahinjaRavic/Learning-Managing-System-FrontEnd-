import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { StudijskiProgram } from '../../../Model/studijskiprogram';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-studijski-programi',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './studijski-programi.component.html',
  styleUrls: ['./studijski-programi.component.scss']
})
export class StudijskiProgramiComponent implements OnInit {
  studijskiProgrami: StudijskiProgram[] = [];
  displayedColumns = ['naziv', 'katedra', 'akcije'];

  constructor(private spService: StudijskiProgramService) {}

  ngOnInit(): void {
    this.spService.getAll().subscribe({
    next: res => {
      console.log('Dobijeni studijski programi:', res);
      this.studijskiProgrami = res;
    },
    error: err => {
      console.error('Greška pri učitavanju studijskih programa:', err);
    }
  });
  }
}
