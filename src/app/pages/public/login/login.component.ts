import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loginError: string | null = null;

  onSubmit() {
    if (this.form.invalid) return;

    this.loginError = null;
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';

    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        console.log('Uspešna prijava', res);
        // npr. preusmeri korisnika ili prikazi poruku
        this.form.reset();
      },
      error: (err) => {
        console.error('Greška pri prijavi', err);
        this.loginError = 'Pogrešan email ili lozinka.';
      },
    });
  }
}
