import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorLog } from '../../../Model/errorLog';
import { ErrorLogService } from '../../../services/error-log.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pregled-gresaka',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './pregled-gresaka.component.html',
  styleUrl: './pregled-gresaka.component.scss'
})
export class PregledGresakaComponent implements OnInit{

  filter = {
    exceptionType: '',
    poruka: ''
  };

  sviLogovi: ErrorLog[] = [];
  logovi: ErrorLog[] = [];

  constructor(
    private service: ErrorLogService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.service.getAll().subscribe({
      next: res => {
        this.sviLogovi = res;
        this.applyFilter();
      },
      error: err => {
        console.error('Greška pri učitavanju grešaka:', err);
        this.snackBar.open('Greška pri učitavanju grešaka.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  applyFilter(): void {
    const type = this.filter.exceptionType.toLowerCase();
    const message = this.filter.poruka.toLowerCase();

    this.logovi = this.sviLogovi.filter(l =>
      l.exceptionType.toLowerCase().includes(type) &&
      l.poruka.toLowerCase().includes(message)
    );
  }

  obrisi(error: ErrorLog){
    
    const confirmed = confirm(`Da li ste sigurni da želite da obrišete log: "${error.exceptionType}"?`);
    if (!confirmed) return;

    this.service.delete(error.id).subscribe({
      next: () => {
        this.loadLogs();
        this.snackBar.open('Greska uspešno obrisana.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju errora.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  vrati(error: ErrorLog){
        this.service.restore(error.id!).subscribe({
          next: () => {
            this.loadLogs()
            this.snackBar.open('greska uspešno vracen.', 'Zatvori', { duration: 3000 });
          },
          error: err => {
            console.error('Greška pri brisanju:', err);
            this.snackBar.open('Greška pri brisanju greska.', 'Zatvori', { duration: 3000 });
          }
        });
      }
}
