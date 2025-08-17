import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudijskiProgram } from './../../../../Model/studijskiprogram';
import { StudijskiProgramService } from './../../../../services/studijski-program.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-studijski-program-detalji',
  templateUrl: './studijski-program-detalji.component.html',
  standalone: true,
  imports: [MatCardModule,MatDividerModule, CommonModule, MatListModule, MatIconModule],
})
export class StudijskiProgramDetaljiComponent implements OnInit {
  program!: StudijskiProgram;

  constructor(
    private route: ActivatedRoute,
    private programService: StudijskiProgramService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.programService.getById(id).subscribe((data) => {
        this.program = data;
        console.log(data)
      });
    }
  }
}