import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EvaluacijaZadatakaService } from '../../../services/evaluacija-zadataka.service';


@Component({
  selector: 'app-evaluacija-zadaci-component',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './evaluacija-zadaci-component.component.html',
  styleUrl: './evaluacija-zadaci-component.component.scss'
})
export class EvaluacijaZadaciComponent {

  private evaluacijaZadatakaService = inject(EvaluacijaZadatakaService);


  evaluacijaId!: number;
zadaci: any[] = [];
evaluacija: any = {};
forma!: FormGroup;

constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) {}

ngOnInit() {
  this.evaluacijaId = Number(this.route.snapshot.paramMap.get('evaluacijaId'));

  this.forma = this.fb.group({
    pitanje: ['', Validators.required],
    tacanOdgovor: ['', Validators.required]
  });

  this.ucitajEvaluaciju();
  this.ucitajZadatke();
}

ucitajEvaluaciju() {
  this.http.get(`/api/evaluacije/${this.evaluacijaId}`).subscribe(res => this.evaluacija = res);
}

ucitajZadatke() {
  this.http.get(`/api/zadaci/evaluacija/${this.evaluacijaId}`).subscribe((res: any) => {
    this.zadaci = res;
  });
}

dodaj() {
  const dtoo = {
    pitanje: this.forma.value.pitanje,
    odgovori: this.forma.value.tacanOdgovor,
    evaluacijaId: this.evaluacijaId
  };

  console.log("DTO koji šaljem:", dtoo);

  this.evaluacijaZadatakaService.dodajZadatakZaEvaluaciju(dtoo).subscribe({
    next: (res) => {
      console.log("Uspešno sačuvano:", res);
      this.forma.reset();
      this.ucitajZadatke();
    },
    error: (err) => {
      console.error("Greška pri čuvanju zadatka:", err);
    }
  });
}



}
