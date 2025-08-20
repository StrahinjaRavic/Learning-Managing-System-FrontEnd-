import { Component, OnInit } from '@angular/core';
import { PrijavaIspitaService } from '../../../services/prijava-ispita.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prijava-ispita',
  templateUrl: './prijava-ispita.component.html',
  styleUrls: ['./prijava-ispita.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatOption, ReactiveFormsModule, CommonModule],
})
export class PrijavaIspitaComponent implements OnInit {
  form!: FormGroup;
  predmeti: any[] = [];
  aktivniRok: any = null;
  studentNaGodiniId: number = 1; // TODO: zameni iz auth servisa

  constructor(
    private prijavaService: PrijavaIspitaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      predmet: [''],
    });

    this.ucitajAktivniRok();
    this.ucitajPredmete();
  }

  ucitajAktivniRok() {
    this.prijavaService.getAktivniRok().subscribe((rok) => {
      this.aktivniRok = rok;
    });
  }

  ucitajPredmete() {
    this.prijavaService
      .getMojiPredmeti(this.studentNaGodiniId)
      .subscribe((data) => (this.predmeti = data));
  }

  prijaviIspit() {
    console.log("rgaeetsrfghfrghes")
    const predmetId = this.form.value.predmet;
    const rokId = this.aktivniRok?.id;

    if (!predmetId || !rokId) return;

    this.prijavaService
      .prijaviIspit(predmetId, rokId)
      .subscribe(() => alert('Uspešno prijavljen ispit'));
  }
}
