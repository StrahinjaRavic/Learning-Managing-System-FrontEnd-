import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudijskiProgramService } from '../../../../services/studijski-program.service';
import { StudijskiProgram } from '../../../../Model/studijskiprogram';

@Component({
  selector: 'app-smer-detalji',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="smer" class="p-6">
      <h2 class="text-2xl font-bold">{{ smer.naziv }}</h2>
      <h3 class="mt-4 font-semibold">Godine studija:</h3>
      <ul>
        <li *ngFor="let godina of smer.godineStudija">
          Godina: {{ godina.godina }}
        </li>
      </ul>
    </div>
  `,
})
export class SmerDetaljiComponent implements OnInit {
  smer!: StudijskiProgram;

  constructor(
    private route: ActivatedRoute,
    private programService: StudijskiProgramService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.programService.getSviProgrami().subscribe(res => {
        const found = res.find(p => p.id === +id);
        if (found) this.smer = found;
      });
    }
  }
}
