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
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loginError: string | null = null;

  onSubmit() {
    if (this.form.invalid) return;

    this.loginError = null;
    const username = this.form.value.username ?? '';
    const password = this.form.value.password ?? '';

    this.authService.login({ username, password }).subscribe({
      next: (token) => {
        console.log('Uspešna prijava, token:', token);
        // npr. preusmeri korisnika, npr:
        // this.router.navigate(['/dashboard']);
        this.form.reset();
      },
      error: (err) => {
        console.error('Greška pri prijavi', err);
        this.loginError = 'Pogrešan username ili lozinka.';
      },
    });
  }
}
