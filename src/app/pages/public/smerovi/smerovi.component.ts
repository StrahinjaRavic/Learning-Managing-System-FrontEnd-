// src/app/smerovi/smerovi.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { StudijskiProgram } from '../../../Model/studijskiprogram';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-smerovi',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Studijski programi</h2>
      <ul>
        <li *ngFor="let program of programi">
          <a [routerLink]="['/smerovi', program.id]">{{ program.naziv }}</a>
        </li>
      </ul>
    </div>
  `,
})
export class SmeroviComponent implements OnInit {
  programi: StudijskiProgram[] = [];

  constructor(private programService: StudijskiProgramService) {}

  ngOnInit(): void {
    this.programService.getSviProgrami().subscribe(res => this.programi = res);
  }
}
