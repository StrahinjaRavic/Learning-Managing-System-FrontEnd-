import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { StudijskiProgram } from '../../../Model/studijskiprogram';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministracijaStudijskihProgramaEditComponent } from '../administracija-studijskih-programa-edit/administracija-studijskih-programa-edit.component';
import { KatedraService } from '../../../services/katedra.service';
import { Katedra } from '../../../Model/katedra';

@Component({
  selector: 'app-administracija-studijskih-programa',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './administracija-studijskih-programa.component.html',
  styleUrls: ['./administracija-studijskih-programa.component.scss']
})
export class AdministracijaStudijskihProgramaComponent implements OnInit {
  studijskiProgrami: StudijskiProgram[] = [];
  katedre: Katedra[] = []
  displayedColumns: string[] = ['naziv', 'katedra', 'obrisano', 'akcije'];

  constructor(private Service: StudijskiProgramService, private katedraService: KatedraService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.Service.getAll().subscribe({
      next: res => {
        this.studijskiProgrami = res;
      },
      error: err => {
        console.error('Greška pri učitavanju studijskih programa:', err);
      }
    });

    this.katedraService.getActive().subscribe({
      next: res => {
        this.katedre = res;
      },
      error: err => {
        console.error('Greška pri učitavanju katedri:', err);
      }
    });
  }

  izmeni(program: StudijskiProgram) {
    const dialogRef = this.dialog.open(AdministracijaStudijskihProgramaEditComponent, {
      width: '700px',
      data: { ...program }
    });

    dialogRef.afterClosed().subscribe((result: StudijskiProgram | undefined) => {
      if (result) {
        this.Service.update(result.id!, result).subscribe({
          next: updated => {
            
            const index = this.studijskiProgrami.findIndex(p => p.id === updated.id);
            if (index !== -1) {
              this.studijskiProgrami[index] = updated;
              this.studijskiProgrami = [...this.studijskiProgrami];
            }
          },
          error: err => {
            console.error('Greška pri ažuriranju:', err);
          }
        });
      }
    });
  }
  
  dodaj(){

    const dialogRef = this.dialog.open(AdministracijaStudijskihProgramaEditComponent, {
      width: '700px',
      data: {
        naziv: '',
        katedra: null
      }
    });

    dialogRef.afterClosed().subscribe((result: StudijskiProgram | undefined) => {
      if (result) {
        this.Service.create(result).subscribe({
          next: updated => {
            
              this.studijskiProgrami.push(updated)
              this.studijskiProgrami = [...this.studijskiProgrami];
            
          },
          error: err => {
            console.error('Greška pri ažuriranju:', err);
          }
        });
      }
    });
  }

  obrisi(program: StudijskiProgram) {
    const confirmed = confirm(`Da li ste sigurni da želite da obrišete studijski program "${program.naziv}"?`);
    if (!confirmed) return;

    this.Service.delete(program.id!).subscribe({
      next: () => {
        this.loadData();
        this.snackBar.open('Studijski program uspešno obrisan.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju studijskog programa.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  vrati(program: StudijskiProgram){
    this.Service.restore(program.id!).subscribe({
      next: () => {
        this.loadData()
        this.snackBar.open('Studijski program uspešno vracen.', 'Zatvori', { duration: 3000 });
      },
      error: err => {
        console.error('Greška pri brisanju:', err);
        this.snackBar.open('Greška pri brisanju studijskog programa.', 'Zatvori', { duration: 3000 });
      }
    });
  }
}
