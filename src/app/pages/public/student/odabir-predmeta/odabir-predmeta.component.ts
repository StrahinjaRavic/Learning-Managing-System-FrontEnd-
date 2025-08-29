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
import { ForumService } from '../../../../services/forum.service';
import { ForumHasKorisnikCreateDTO } from '../../../../Model/DTO/forumHasKorisnikCreateDTO';

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
  userRoles: string [] = [];
  studentId!: number
  id! : number

  predmetiOdabrani = false;

  constructor(private authService: AuthService, private forumService: ForumService, private studentService: StudentService, private snackBar: MatSnackBar, private pohadjanjeService: PohadjanjePredmetaService, private studentNaGodiniService: StudentNaGodiniService, private realizacijaPredmetaService: RealizacijaPredmetaService){}

  ngOnInit(): void {
    this.authService.getStudentIdByUserId(this.authService.getLoggedInUserId()!).subscribe(id => {
      this.studentId = id!;
      this.loadStudentiNaGodini();
    });

    

    this.authService.userRole$.subscribe(roles => {
      this.userRoles = roles;
    });
  }

  loadStudentiNaGodini(){
    
    if(this.studentId != null){
      this.studentNaGodiniService.getByStudentId(this.studentId).subscribe({
            next: res => {
              this.loggedInStudentNaGodini = res;

              if (this.loggedInStudentNaGodini.length === 1) {
                this.selectedStudentNaGodini = this.loggedInStudentNaGodini[0];
                this.loadRealizacije(this.selectedStudentNaGodini.godinaStudija.id);
              }
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
    const korisnikId = this.authService.getLoggedInUserId();

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

          this.forumService.getForumByNaziv(realizacija.predmet.naziv).subscribe({
          next: forum => {
            if (forum && korisnikId) {
              const fkh: ForumHasKorisnikCreateDTO = {
                forum_id: forum.id,
                ulogovaniKorisnik_id: korisnikId
              };

              this.forumService.addKorisnikToForum(fkh).subscribe({
                next: fhkSaved => {
                  console.log("Student dodat u forum:", fhkSaved);
                },
                error: err => {
                  console.log("Greška pri dodavanju studenta u forum");
                }
              });
            }
          }
        });

        },
        error: err => {
          console.log("greska pri cuvanju pohadjanja");
        }
      });
    });
    this.snackBar.open('Predmeti uspesno izabrani.', 'Zatvori', { duration: 3000 });
    this.predmetiOdabrani = true;
  }

}
