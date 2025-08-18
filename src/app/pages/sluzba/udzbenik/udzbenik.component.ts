import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { Udzbenik } from '../../../Model/udzbenik';
import { IzdavanjeService } from '../../../services/izdavanje.service';
import { DodavanjeService } from '../../../services/dodavanje.service';
import { UdzbenikService } from '../../../services/udzbenik.service';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { StudentNaGodini } from '../../../Model/studentnagodini';
import { IzdavanjeCreateDTO } from '../../../Model/DTO/izdavanjeCreateDTO';
import { DodavanjeCreateDTO } from '../../../Model/DTO/dodavanjeCreateDTO';

@Component({
  selector: 'app-udzbenik',
  standalone: true,
  templateUrl: './udzbenik.component.html',
  styleUrls: ['./udzbenik.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class UdzbenikComponent implements OnInit {

  udzbenici: Udzbenik[] = [];
  sviUdzbenici: Udzbenik[] = [];
  studenti: StudentNaGodini[] = [];

  filterText: string = ''; // filter po nazivu

  dodavanjeUdzbenikaForm: FormGroup;
  izdavanjeForm: FormGroup;
  nabavkaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private udzbenikService: UdzbenikService,
    private izdavanjeService: IzdavanjeService,
    private dodavanjeService: DodavanjeService,
    private studentNaGodiniService: StudentNaGodiniService
  ) {
    this.dodavanjeUdzbenikaForm = this.fb.group({
      naziv: [''],
      autor: [''],
      isbn: [''],
      kolicina: [1]
    });

    this.izdavanjeForm = this.fb.group({
      student: [''],
      kolicina: [1]
    });

    this.nabavkaForm = this.fb.group({
      kolicina: [1]
    });
  }

  ngOnInit(): void {
    this.loadUdzbenici();
    this.loadStudenti();
  }

  loadStudenti(){
    this.studentNaGodiniService.getActive().subscribe({
      next:data => {
        this.studenti = data;
        console.log(this.studenti);
      }
    });
  }

  loadUdzbenici() {
    this.udzbenikService.getAll().subscribe(data => {
      this.sviUdzbenici = data; // čuvamo sve udžbenike
      this.applyFilter();
    });
  }

  applyFilter() {
    const filter = this.filterText.toLowerCase();
    this.udzbenici = this.sviUdzbenici
      .filter(u => u.kolicina >= 1) // samo aktivni udžbenici
      .filter(u => u.naziv?.toLowerCase().includes(filter));
  }

  dodajUdzbenik() {
    this.udzbenikService.create(this.dodavanjeUdzbenikaForm.value).subscribe(() => {
      this.loadUdzbenici();
      this.dodavanjeUdzbenikaForm.reset({ kolicina: 1 });
    });
  }

  izdajUdzbenik(u: Udzbenik) {
    const izdavanje: IzdavanjeCreateDTO = {
      udzbenik_id: u.id!,
      studentNaGodini_id: this.izdavanjeForm.value.student,
      kolicina: this.izdavanjeForm.value.kolicina,
      datum: new Date().toISOString()
    };
    this.izdavanjeService.create(izdavanje).subscribe(() => {
      u.kolicina -= izdavanje.kolicina;
      this.udzbenikService.update(u.id!, u).subscribe(() => this.loadUdzbenici());
      this.izdavanjeForm.reset({ student: '', kolicina: 1 });
    });
  }

  dopuniNabavku(u: Udzbenik) {
    const kolicina = this.nabavkaForm.value.kolicina;
    const dodavanje: DodavanjeCreateDTO = {
      udzbenik_id: u.id!,
      kolicina: kolicina,
      datum: new Date().toISOString()
    };
    this.dodavanjeService.create(dodavanje).subscribe(() => {
      u.kolicina += kolicina;
      this.udzbenikService.update(u.id!, u).subscribe(() => this.loadUdzbenici());
      this.nabavkaForm.reset({ kolicina: 1 });
    });
  }

  obrisiUdzbenik(id: number) {
    console.log("Brisem udzbenik sa ID:", id);
    if (id === undefined) return;

    this.udzbenikService.delete(id).subscribe({
      next: () => {
        console.log("Udzbenik obrisan");
        this.udzbenici = this.udzbenici.filter(u => u.id !== id);
      },
      error: err => console.error("Greska pri brisanju:", err)
    });
  }

}
