import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfilService } from '../../../services/profil.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private profilService: ProfilService) {
    this.form = this.fb.group({
      korisnickoIme: [''],
      lozinka: [''],
      email: [''],
      osoba: this.fb.group({
        ime: [''],
        prezime: ['']
      })
    });
  }

  ngOnInit(): void {
    this.profilService.getProfil().subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  sacuvaj(): void {
    this.profilService.updateProfil(this.form.value).subscribe({
      next: () => alert('Profil sačuvan.'),
      error: () => alert('Greška pri čuvanju profila.')
    });
  }
}
