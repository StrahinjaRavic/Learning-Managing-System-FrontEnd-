import { Component, OnInit } from '@angular/core';
import { UpisService } from '../../../../../../services/upis.service';
import { Student } from '../../../../../../Model/student';
import { GodinaStudija } from '../../../../../../Model/godinastudija';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upis',
  templateUrl: './upis-form.component.html',
  styleUrls: ['./upis-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule] 
})
export class UpisFormComponent implements OnInit {
  studenti: Student[] = [];
  godineStudija: GodinaStudija[] = [];

  izabraniStudentId: number | null = null;
  izabranaGodinaId: number | null = null;

  poruka: string = '';

  constructor(private upisService: UpisService) {}

  ngOnInit(): void {
    this.ucitajPodatke();
  }

  ucitajPodatke(): void {
    this.upisService.getStudenti().subscribe({
      next: res => this.studenti = res,
      error: err => console.error('Greška pri učitavanju studenata', err)
    });

    this.upisService.getGodineStudija().subscribe({
      next: res => this.godineStudija = res,
      error: err => console.error('Greška pri učitavanju godina studija', err)
    });
  }

  upisiStudenta(): void {
    if (!this.izabraniStudentId || !this.izabranaGodinaId) {
      this.poruka = 'Morate izabrati studenta i godinu studija.';
      return;
    }

    this.upisService.upisiNaGodinu(this.izabraniStudentId, this.izabranaGodinaId).subscribe({
      next: _ => this.poruka = 'Uspešno upisan student!',
      error: err => {
        console.error(err);
        this.poruka = 'Greška pri upisu.';
      }
    });
  }
}
