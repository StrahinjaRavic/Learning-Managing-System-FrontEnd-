import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrijavaPolaganjaService } from '../../../services/prijava-polaganja.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unesi-ocenu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatInputModule, MatButtonModule],
  templateUrl: './unesi-ocenu.component.html'
})
export class UnesiOcenuComponent implements OnInit {
  ocenaForm!: FormGroup;
  prijavaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prijavaService: PrijavaPolaganjaService
  ) {}

  ngOnInit(): void {
    this.prijavaId = Number(this.route.snapshot.paramMap.get('id'));

    this.ocenaForm = this.fb.group({
      brojBodova: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit(): void {
    if (this.ocenaForm.invalid) return;

    const brojBodova = this.ocenaForm.value.brojBodova;

    this.prijavaService
      .unesiOcenu(this.prijavaId, brojBodova)
      .subscribe({
        next: () => {
          alert('Uspešno unet broj bodova!');
          this.router.navigate(['/']); // ili na listu prijava, npr. /prijave
        },
        error: (err) => {
          console.error(err);
          alert('Došlo je do greške prilikom unosa bodova.');
        }
      });
  }
}
