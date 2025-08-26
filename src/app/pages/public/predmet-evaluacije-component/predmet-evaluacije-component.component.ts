import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule,FormBuilder, FormGroup, FormArray, Validators,ReactiveFormsModule } from '@angular/forms';

import { EvaluacijaZadatakaService } from '../../../services/evaluacija-zadataka.service';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { RealizacijaPredmeta } from '../../../Model/realizacijapredmeta';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ZadatakAddComponent } from './zadatak-add/zadatak-add.component';
import { MatCardModule } from '@angular/material/card';
import { EvaluacijaAddComponent } from './evaluacija-add/evaluacija-add.component';
import { EvaluacijaZnanja } from '../../../Model/evaluacijaznanja';
import { EvaluacijaZnanjaCreateDTO } from '../../../Model/DTO/EvaluacijaZnanjaCreateDTO';

@Component({
  selector: 'app-predmet-evaluacije',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './predmet-evaluacije-component.component.html',
  styleUrls: ['./predmet-evaluacije-component.component.scss'],
  providers: [EvaluacijaZadatakaService]
})
export class PredmetEvaluacijeComponent implements OnInit {
  forma: FormGroup;
  predmetId!: number;
  selektovanaEvaluacijaId!: number;
  evaluacije: any[] = [];
  zadaci: any[] = [];
  selektovanaEvaluacija: any = {};
  realizacija!: RealizacijaPredmeta

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: EvaluacijaZadatakaService,
    private realizacijaService: RealizacijaPredmetaService,
    private dialog: MatDialog
  ) {
    this.forma = this.fb.group({
      pitanje: ['', Validators.required],
      odgovori: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

    ngOnInit(): void {
      this.predmetId = Number(this.route.snapshot.paramMap.get('id'));
      this.ucitajEvaluacije();
    }

    get odgovoriControls() {
      return (this.forma.get('odgovori') as FormArray).controls;
    }

    dodajOdgovor() {
      (this.forma.get('odgovori') as FormArray).push(this.fb.control('', Validators.required));
    }

    ukloniOdgovor(index: number) {
      (this.forma.get('odgovori') as FormArray).removeAt(index);
    }

    ucitajEvaluacije(): void {
      this.service.getEvaluacijeZaPredmet(this.predmetId).subscribe({
        next: (data) => {
          this.evaluacije = data},
        error: (err) => console.error('Greška prilikom učitavanja evaluacija', err)
        
      });

      this.realizacijaService.getById(this.predmetId).subscribe({
        next: res => {
          this.realizacija = res;
        }
      })
    }

    otvoriDodavanjeZadatka() {
      const dialogRef = this.dialog.open(ZadatakAddComponent, {
        width: '800px',
        data: { evaluacijaId: this.selektovanaEvaluacijaId }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // result = { pitanje: string, odgovori: string[] }
          this.service.dodajZadatakZaEvaluaciju({
            pitanje: result.pitanje,
            odgovori: result.odgovori,
            evaluacijaId: this.selektovanaEvaluacijaId
          }).subscribe({
            next: () => {
              alert('Zadatak uspešno dodat.');
              this.ucitajZadatke();
            }
          });
        }
      });
    }

  ucitajZadatke(): void {
    if (!this.selektovanaEvaluacijaId) return;


    this.service.getZadaciZaEvaluaciju(this.selektovanaEvaluacijaId).subscribe({
      next: (res) => {
        this.zadaci = res;
      },
      error: (err) => console.error('Greška prilikom učitavanja zadataka', err)
    });
  }

  sacuvajZadatak(): void {
    if (!this.selektovanaEvaluacijaId) return;

    const zadatak = {
      pitanje: this.forma.value.pitanje,
      odgovori: this.forma.value.odgovori, // each object has {odgovor, tacan}
      evaluacijaId: this.selektovanaEvaluacijaId
    };

    this.service.dodajZadatakZaEvaluaciju(zadatak).subscribe({
      next: () => {
        this.forma.reset();
        this.forma.setControl('odgovori', this.fb.array([
          this.fb.group({ odgovor: '', tacan: false })
        ]));
        this.ucitajZadatke();
        alert('Zadatak uspešno dodat.');
      },
      error: (err) => console.error('Greška prilikom dodavanja zadatka', err)
    });
  }

  dodajEvaluaciju(){
    const dialogRef = this.dialog.open(EvaluacijaAddComponent, {
      width: '800px',
      data: {
        naziv: '',
        title: 'Kreiraj Evaluaciju'
      }
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        const nova: EvaluacijaZnanjaCreateDTO = {
          naziv: result,
          realizacijaPredmeta_id: this.predmetId
        }
        this.service.create(nova).subscribe({
          next: created => {
            this.ucitajEvaluacije()
          },
          error: err => {
            console.log(err)
          }
        })
      }
    });
  }
}
