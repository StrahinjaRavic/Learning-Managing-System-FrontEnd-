import { Component, OnInit } from '@angular/core';
import { Udzbenik } from '../../../Model/udzbenik';
import { UdzbenikService } from '../../../services/udzbenik.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pregled-udzbenika',
  imports: [CommonModule,FormsModule,MatTableModule,MatButtonModule,MatIconModule,MatCardModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatCheckboxModule,RouterModule],
  templateUrl: './pregled-udzbenika.component.html',
  styleUrl: './pregled-udzbenika.component.scss'
})
export class PregledUdzbenikaComponent {

  udzbenici: Udzbenik[] = [];
  sviUdzbenici: Udzbenik[] = [];
  displayedColumns: string[] = ['id', 'naziv', 'autor', 'isbn', 'kolicina', 'obrisano', 'akcije'];

  filter = {
    naziv: '',
    autor: '',
    obrisano: false
  };

   constructor(private service: UdzbenikService, private snackBar: MatSnackBar) {}

   ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe({
      next: res => {
        this.sviUdzbenici = res;
        this.applyFilter();
      },
      error: err => console.error('Greška pri učitavanju udžbenika:', err)
    });
  }

  applyFilter() {
    const naziv = this.filter.naziv.toLowerCase();
    const autor = this.filter.autor.toLowerCase();

    this.udzbenici = this.sviUdzbenici.filter(u =>
      (u.naziv?.toLowerCase() ?? '').includes(naziv) &&
      (u.autor?.toLowerCase() ?? '').includes(autor) &&
      (this.filter.obrisano || !u.obrisano)
    );
  }
}
