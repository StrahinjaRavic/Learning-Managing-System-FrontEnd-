import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule,RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

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
        this.router.navigate(['/admin']);
        this.form.reset();
      },
      error: (err) => {
        console.error('Greška pri prijavi', err);
        this.loginError = 'Pogrešan username ili lozinka.';
      },
    });
  }
}
