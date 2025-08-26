import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { GodinaStudijaService } from '../../../../services/godina-studija.service';
import { RealizacijaPredmeta } from '../../../../Model/realizacijapredmeta';
import { GodinaStudija } from '../../../../Model/godinastudija';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DodavanjePredmetaComponent } from '../dodavanje-predmeta/dodavanje-predmeta.component';
import { ForumService } from '../../../../services/forum.service';
import { UlogovaniKorisnikService } from '../../../../services/ulogovani-korisnik.service';
import { catchError, firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-pregled-predmeta',
  imports: [CommonModule,MatListModule,MatButtonModule,MatCardModule,MatIconModule,MatTableModule],
  templateUrl: './pregled-predmeta.component.html',
  styleUrl: './pregled-predmeta.component.scss'
})
export class PregledPredmetaComponent implements OnInit{
  realizacije: RealizacijaPredmeta[] = [];
  godinaStudija!: GodinaStudija;
  loading = true;
  displayedColumns = ['naziv', 'profesor', 'akcije'];

  constructor( private route: ActivatedRoute, private ulogovaniKorisnikService: UlogovaniKorisnikService, private realizacijaService: RealizacijaPredmetaService, private forumService: ForumService, private godinaStudijaService: GodinaStudijaService, private dialog: MatDialog){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.godinaStudijaService.getById(id).subscribe({
      next: (g) => {
        this.godinaStudija = g;
        this.loadData()
      }
    });
  }

  loadData(){
    this.realizacijaService.getRealizacijaByGodinaStudijaId(this.godinaStudija.id).subscribe({
      next: (res) => {
        this.realizacije = res;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  izmeni(predmet: RealizacijaPredmeta){
  
    const dialogRef = this.dialog.open(DodavanjePredmetaComponent, {
       width: '700px',
      data: {predmet:{...predmet},title:"Izmeni Predmet"}
    });

    dialogRef.afterClosed().subscribe((result: RealizacijaPredmeta | undefined) => {
          if (result) {
            result.godinaStudija_id = result.godinaStudija.id
            this.realizacijaService.update(result.id, result).subscribe({
              next: updated => {
                const index = this.realizacije.findIndex(p => p.id === updated.id);
              if (index !== -1) {
                this.realizacije[index] = updated;
                this.realizacije = [...this.realizacije];
              }
              }
            })
          }
        });
  }

  dodaj() {
  const dialogRef = this.dialog.open(DodavanjePredmetaComponent, {
    width: '700px',
    data: { predmet: null, title: 'Dodaj Predmet' }
  });

  dialogRef.afterClosed().subscribe((result: RealizacijaPredmeta | undefined) => {
    if (!result) return;

    result.godinaStudija_id = this.godinaStudija.id;

    // Step 1: create realizacijaPredmeta
    this.realizacijaService.create(result).subscribe({
      next: async (createdRealizacija) => {
        this.realizacije.push(createdRealizacija);
        this.realizacije = [...this.realizacije];

        const nazivPredmeta = createdRealizacija.predmet.naziv;
        const nastavnikOsobaId = createdRealizacija.nastavnik.osoba.id;

        try {
          // Step 2: check if forum exists
          let forum = await firstValueFrom(
            this.forumService.getForumByNaziv(nazivPredmeta).pipe(
              catchError(err => {
                if (err.status === 404) {
                  return of(null); // treat 404 as "not found"
                }
                throw err; // rethrow other errors
              })
            )
          );
          // If forum does not exist, create it
          if (!forum) {
             forum = await firstValueFrom(this.forumService.create({
               naziv: nazivPredmeta
             }))
           }

          // Step 3: get ulogovaniKorisnik for the nastavnik
          const korisnik = await firstValueFrom(this.ulogovaniKorisnikService.getByOsobaId(nastavnikOsobaId))

          // Step 4: create ForumHasKorisnik entry
          await firstValueFrom(this.forumService.addKorisnikToForum({
             forum_id: forum!.id,
             ulogovaniKorisnik_id: korisnik!.id
           }))

        } catch (err) {
          console.error('Error while creating forum or linking korisnik:', err);
        }
      }
    });
  });
}


  obrisi(realizacija: RealizacijaPredmeta){

    const confirmed = confirm(`Da li ste sigurni da želite da uklonite predmet "${realizacija.predmet.naziv}" sa smera "${this.godinaStudija.studijskiProgram.naziv}"?`);
    if (!confirmed) return;

    this.realizacijaService.delete(realizacija.id).subscribe({
      next: res => {
        this.loadData()
      }
    })
  }
}
