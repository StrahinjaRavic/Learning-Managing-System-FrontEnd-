import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: this.passwordsMatchValidator,
  });

  registrationError: string | null = null;
  registrationSuccess: string | null = null;

  passwordsMatchValidator(group: any) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.registrationError = null;
    this.registrationSuccess = null;

    const username = this.form.value.username ?? '';
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';

    this.authService.register({ username, email, password }).subscribe({
      next: (msg) => {
        this.registrationSuccess = 'Uspešno ste se registrovali. Možete se prijaviti.';
        this.form.reset();
      },
      error: (err) => {
        console.error('Greška pri registraciji', err);
        this.registrationError = 'Registracija nije uspela. Proverite podatke i pokušajte ponovo.';
      }
    });
  }
}
