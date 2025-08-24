import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { StudentService } from '../../../../services/student.service';
import { StudentNaGodiniService } from '../../../../services/student-na-godini.service';
import { StudentNaGodini } from '../../../../Model/studentnagodini';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { RealizacijaPredmeta } from '../../../../Model/realizacijapredmeta';
import { PohadjanjePredmetaService } from '../../../../services/pohadjanje-predmeta.service';
import { PohadjanjePredmeta } from '../../../../Model/pohadjanjepredmeta';
import { catchError, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-odabir-predmeta',
  imports: [CommonModule,FormsModule,MatCardModule,MatFormFieldModule,MatSelectModule,MatOptionModule,MatButtonModule,MatCheckboxModule],
  templateUrl: './odabir-predmeta.component.html',
  styleUrl: './odabir-predmeta.component.scss'
})
export class OdabirPredmetaComponent implements OnInit{

  loggedInStudentNaGodini: StudentNaGodini[] = [];
  selectedStudentNaGodini!: StudentNaGodini;
  realizacijePredmeta: RealizacijaPredmeta[] = [];
  pohadjanjaPredmeta: PohadjanjePredmeta[] = [];

  predmetiOdabrani = false;

  constructor(private authService: AuthService, private studentService: StudentService, private snackBar: MatSnackBar, private pohadjanjeService: PohadjanjePredmetaService, private studentNaGodiniService: StudentNaGodiniService, private realizacijaPredmetaService: RealizacijaPredmetaService){}

  ngOnInit(): void {
    this.loadStudentiNaGodini();
  }

  loadStudentiNaGodini(){
    if(this.authService.getUsernameFromToken()){
      this.studentService.getIdByUsername(this.authService.getUsernameFromToken()!).subscribe({
        next: id => {
          this.studentNaGodiniService.getByStudentId(id).subscribe({
            next: res => {
              this.loggedInStudentNaGodini = res;

              if (this.loggedInStudentNaGodini.length === 1) {
                this.selectedStudentNaGodini = this.loggedInStudentNaGodini[0];
                this.loadRealizacije(this.selectedStudentNaGodini.godinaStudija.id);
              }
            }
          })
        }
      })    
    }
  }

  loadPohadjanjaZaStudentaNaGodini(id : number){
    this.pohadjanjeService.getByStudentNaGodiniId(id).pipe(
      catchError(err => {
        if (err.status === 404) {
          return of([]);
        }
        throw err;
      })
    ).subscribe({
      next: res => {
        
        this.pohadjanjaPredmeta = res;

        this.realizacijePredmeta = this.realizacijePredmeta.map(realizacija => {
        const alreadyChosen = this.pohadjanjaPredmeta.some(
          p => p.realizacijaPredmeta!.id === realizacija.id
        );

        return {
          ...realizacija,
          selected: alreadyChosen || realizacija.predmet.obavezan
        };
      });

        this.predmetiOdabrani = this.realizacijePredmeta.some(realizacija =>
          this.pohadjanjaPredmeta.some(
            p => p.realizacijaPredmeta!.id === realizacija.id
          )
        );
      }
    })
  }

  onStudentNaGodiniChange(selected: StudentNaGodini) {
    this.realizacijaPredmetaService
      .getRealizacijaByGodinaStudijaId(selected.godinaStudija.id)
      .subscribe(realizacije => {
      this.realizacijePredmeta = realizacije.map(r => ({
        ...r,
        selected: r.predmet.obavezan
      }));
    });
    this.loadPohadjanjaZaStudentaNaGodini(selected.id);
  }

  loadRealizacije(godinaStudijaId: number) {
    this.realizacijaPredmetaService.getRealizacijaByGodinaStudijaId(godinaStudijaId)
      .subscribe({
        next: realizacije => {
          this.realizacijePredmeta = realizacije;
          this.loadPohadjanjaZaStudentaNaGodini(this.selectedStudentNaGodini.id)
        }
      });
  }

  onOdaberiPredmete() {
    const selectedRealizacije = this.realizacijePredmeta.filter(r => r.selected);

    selectedRealizacije.forEach(realizacija => {
      const newPohadjanje: PohadjanjePredmeta = {
        studentNaGodini_id: this.selectedStudentNaGodini.id,
        realizacijaPredmeta_id: realizacija.id,
        obrisano: false,
        konacnaOcena: null,
      };

      this.pohadjanjeService.create(newPohadjanje).subscribe({
        next: saved => {
          console.log("Pohadjanje saved:", saved);
        },
        error: err => {
          console.error("Error saving pohadjanje:", err);
        }
      });
    });
    this.snackBar.open('Predmeti uspesno izabrani.', 'Zatvori', { duration: 3000 });
    this.predmetiOdabrani = true;
  }

}
