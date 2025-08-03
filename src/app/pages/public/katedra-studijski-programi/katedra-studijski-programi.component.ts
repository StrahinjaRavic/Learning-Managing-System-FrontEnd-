import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { StudijskiProgram } from '../../../Model/studijskiprogram';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-katedra-studijski-programi',
  imports: [CommonModule, MatTableModule, MatCardModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './katedra-studijski-programi.component.html',
  styleUrl: './katedra-studijski-programi.component.scss'
})
export class KatedraStudijskiProgramiComponent implements OnInit{
studijskiProgrami: StudijskiProgram[] = [];
displayedColumns = ['naziv', 'katedra', 'akcije'];
katedraId!: number;

  constructor(private spService: StudijskiProgramService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.katedraId = +this.route.snapshot.paramMap.get('id')!;

    this.spService.getByKatedraId(this.katedraId).subscribe({
    next: res => {
      this.studijskiProgrami = res;
    },
    error: err => {
      console.error('Greška pri učitavanju studijskih programa:', err);
    }
  });
  }
}
