import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Mesto } from '../../../Model/mesto';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MestoService } from '../../../services/mesto.service';

@Component({
  selector: 'app-dodavanje-osobe',
  standalone: true,
  templateUrl: './dodavanje-osobe.component.html',
  styleUrls: ['./dodavanje-osobe.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule
  ]

})
export class DodavanjeOsobeComponent {
  private fb = inject(FormBuilder);
  mestoControl = new FormControl('', Validators.required);
  private mestoService = inject(MestoService);

  mesta: Mesto[] = [];
  filteredMesta: Mesto[] = [];

  form = this.fb.group({
    jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
    ime: ['', Validators.required],
    prezime: ['', Validators.required],
    adresa: this.fb.group({
      ulica: ['', Validators.required],
      broj: ['', Validators.required],
      mestoId: [null as number | null, Validators.required]
    })
  });

  ngOnInit(): void {
    this.mestoService.getActive().subscribe({
      next: mesta => this.mesta = mesta,
      error: err => console.error('Greška pri učitavanju mesta:', err)
    });

    this.mestoControl.valueChanges
      .pipe(startWith(''))
      .subscribe(value => {
        const filterValue = value?.toLowerCase() ?? '';
        this.filteredMesta = this.mesta.filter(m =>
          m.naziv.toLowerCase().includes(filterValue)
        );
      });
  }

  onMestoSelected(selectedNaziv: string) {
    const selectedMesto = this.mesta.find(m => m.naziv === selectedNaziv);
    if (selectedMesto) {
      this.form.get('adresa')?.get('mestoId')?.setValue(selectedMesto.id);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    console.log('Slanje osobe:', this.form.value);
  }
}
