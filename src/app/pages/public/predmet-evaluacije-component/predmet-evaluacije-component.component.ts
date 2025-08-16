import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { EvaluacijaZadatakaService } from '../../../services/evaluacija-zadataka.service';

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
    FormsModule
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: EvaluacijaZadatakaService
  ) {
    this.forma = this.fb.group({
      pitanje: ['', Validators.required],
      odgovori: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.predmetId = Number(this.route.snapshot.paramMap.get('id'));
    this.ucitajEvaluacije();
  }

  ucitajEvaluacije(): void {
    this.service.getEvaluacijeZaPredmet(this.predmetId).subscribe({
      next: (data) => this.evaluacije = data,
      error: (err) => console.error('Greška prilikom učitavanja evaluacija', err)
      
    });
  }

  ucitajZadatke(): void {
    if (!this.selektovanaEvaluacijaId) return;

    this.service.getEvaluacijeZaPredmet(this.predmetId).subscribe({
      next: () => {
        this.service.getEvaluacijeZaPredmet(this.predmetId).subscribe(); // (ako ti treba update ovde možeš dodati drugi metod za evaluaciju)
      },
      error: (err) => console.error('Greška prilikom učitavanja zadataka', err)
    });

    this.service.getZadaciZaEvaluaciju(this.selektovanaEvaluacijaId).subscribe({
      next: (res) => {
        this.zadaci = res;
        console.log(res);
      },
      error: (err) => console.error('Greška prilikom učitavanja zadataka', err)
    });
  }

  sacuvajZadatak(): void {
    if (!this.selektovanaEvaluacijaId) return;

    const zadatak = {
      pitanje: this.forma.value.pitanje,
      odgovori: [this.forma.value.odgovori],
      evaluacijaId: this.selektovanaEvaluacijaId
    };

    console.log("DTO koji šaljem:", zadatak);

    this.service.dodajZadatakZaEvaluaciju(zadatak).subscribe({
      next: () => {
        this.forma.reset();
        this.ucitajZadatke();
        alert('Zadatak uspešno dodat.');
      },
      error: (err) => console.error('Greška prilikom dodavanja zadatka', err)
    });
  }
}
