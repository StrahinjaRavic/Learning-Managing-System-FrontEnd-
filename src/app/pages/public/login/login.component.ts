import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
  private http = inject(HttpClient)
  userRoles: string [] = [];
  imageUrl: string | null = null;


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
        this.form.reset();
        this.loadProfilePhoto(this.authService.getLoggedInUserId()!);

        this.authService.userRole$.subscribe(roles => {
          this.userRoles = roles;
          
          if (!roles || roles.length === 0) {
            this.router.navigate(['/']);
            return;
          }

          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
          } else if (roles.includes('ROLE_SLUZBA')) {
            this.router.navigate(['/opsta-obavestenja']);
          } else if (roles.includes('ROLE_STUDENT')) {
            this.router.navigate(['/opsta-obavestenja']);
          } else if (roles.includes('ROLE_NASTAVNIK')) {
            this.router.navigate(['/nastavnik-predmeti']);
          } else {
            this.router.navigate(['/']);
          }
          
        });
      },
      error: (err) => {
        console.error('Greška pri prijavi', err);
        this.loginError = 'Pogrešan username ili lozinka.';
      },
    });
  }

  loadProfilePhoto(userId: number): void {
    const url = `http://localhost:8080/api/photos/photo/${userId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        if(blob && blob.size > 0){
          this.imageUrl = URL.createObjectURL(blob);
          this.authService.setSlikaUrl(this.imageUrl);
        }else{
          this.imageUrl = 'default-avatar.png'}
      }
    });
  }
}
