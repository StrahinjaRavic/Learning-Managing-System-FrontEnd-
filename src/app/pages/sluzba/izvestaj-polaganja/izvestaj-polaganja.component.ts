import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IzvestajPolaganjaService, IzvestajDTO } from '../../../services/izvestaj-polaganja.service';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-izvestaj-polaganja',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './izvestaj-polaganja.component.html',
  styleUrls: ['./izvestaj-polaganja.component.scss']
})
export class IzvestajPolaganjaComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  data?: IzvestajDTO;
  displayedColumns = ['polaganjeId', 'datum', 'student', 'indeks', 'bodovi', 'ocena'];

  rokovi: any[] = [];
  predmeti: any[] = [];

  private chart?: Chart;

  @ViewChild('histCanvas') histCanvas!: ElementRef<HTMLCanvasElement>; // <-- ovde

  constructor(private fb: FormBuilder, private svc: IzvestajPolaganjaService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      predmetId: [''],
      rokId: [''],
    });

    this.svc.getRokovi().subscribe(r => this.rokovi = r);
    this.svc.getPredmeti().subscribe(p => this.predmeti = p);
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  load() {
    const { rokId, predmetId } = this.form.value;
    if (!rokId || !predmetId) return;

    this.svc.getIzvestaj(rokId, predmetId).subscribe({
      next: (dto) => {
        this.data = dto;
        this.renderChart(dto);
      },
      error: (err) => {
        console.error('Greška pri učitavanju izveštaja', err);
        this.data = undefined;
        this.destroyChart();
      }
    });
  }

  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  downloadPdf() {
  const rokId = this.form.value.rokId;
  const predmetId = this.form.value.predmetId;
  if (!rokId || !predmetId) return;

  // kreiramo URL sa query parametrima
  const url = `http://localhost:8080/api/izvestaj/pdf?rokId=${rokId}&predmetId=${predmetId}`;

  // kreiramo skriven link za preuzimanje
  const link = document.createElement('a');
  link.href = url;
  link.download = `izvestaj_polaganja.pdf`;
  link.click();
}


private renderChart(dto: IzvestajDTO) {
    if (!this.histCanvas) return;

    const labels = ['5','6','7','8','9','10'];
    const values = labels.map(l => dto.histogram[l] ?? 0);

    this.chart = new Chart(this.histCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Broj studenata po oceni',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // obavezno da popuni visinu
        plugins: { legend: { display: true } },
        scales: {
          x: { title: { display: true, text: 'Ocena' } },
          y: { title: { display: true, text: 'Broj' }, beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }

   sendMail() {
    const predmetId = Number(this.form.value.predmetId);
    const rokId = Number(this.form.value.rokId);
    if (!predmetId) return;

    this.svc.sendMail(rokId, predmetId).subscribe({
      next: () => alert('Mail poslat svim nastavnicima angažovanim na predmetu!'),
      error: (err) => console.error('Greška pri slanju mejla', err)
    });
  }

}