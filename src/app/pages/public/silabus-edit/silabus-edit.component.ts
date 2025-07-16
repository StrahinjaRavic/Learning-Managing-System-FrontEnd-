import { Component, OnInit } from '@angular/core';
import { SilabusService } from '../../../services/silabus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Silabus } from '../../../Model/silabus';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-silabus-edit',
  templateUrl: './silabus-edit.component.html',
  styleUrls: ['./silabus-edit.component.scss'],
  imports:[FormsModule, NgIf]
})
export class SilabusEditComponent implements OnInit {
  silabus!: Silabus;
  isLoading = true;
  error = '';

  constructor(
    private silabusService: SilabusService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const predmetId = Number(this.route.snapshot.paramMap.get('predmetId'));
    console.log (predmetId)
    //const predmetId = 2;
    if (!predmetId) {
      this.error = 'Nepoznat ID predmeta';
      this.isLoading = false;
      return;
    }

    // Učitaj silabus za predmet
    this.silabusService.getByPredmetId(predmetId).subscribe({
      next: silabusi => {
        if (silabusi.length > 0) {
          this.silabus = silabusi[0]; // Pretpostavimo da je jedan silabus po predmetu
        } else {
          // Ako nema silabusa, napravi prazan objekat za edit
          this.silabus = {
            id: 0,
            opis: '',
            predmetId: predmetId,
            obrisano: false
          };
        }
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Greška pri učitavanju silabusa';
        this.isLoading = false;
      }
    });
  }

  save(): void {
  console.log('Saljem silabus:', this.silabus);
  this.silabusService.save(this.silabus).subscribe({
    next: () => {
      alert('Silabus uspešno sačuvan');
      this.router.navigate(['/nastavnik-predmeti']);
    },
    error: (err) => {
      console.error('Greška pri čuvanju silabusa', err);
      alert('Greška pri čuvanju silabusa');
    }
  });
}

}
