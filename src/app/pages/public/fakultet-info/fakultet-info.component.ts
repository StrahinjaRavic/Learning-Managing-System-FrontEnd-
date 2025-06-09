// src/app/fakultet-info/fakultet-info.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakultetService } from '../../../services/fakultet.service';
import { Fakultet } from '../../../Model/fakultet';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fakultet-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './fakultet-info.component.html',
})
export class FakultetInfoComponent implements OnInit {
  fakulteti: Fakultet[] = [];

  constructor(private fakultetService: FakultetService) {}

  ngOnInit(): void {
  this.fakultetService.getFakultet().subscribe({
    next: res => {
      console.log('Dobijeni fakulteti:', res);
      this.fakulteti = res;
    },
    error: err => {
      console.error('Greška pri učitavanju fakulteta:', err);
    }
  });
}
}
