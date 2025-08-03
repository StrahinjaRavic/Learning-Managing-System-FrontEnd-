import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule,NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatToolbarModule, MatMenuModule, MatTooltipModule,MatSidenavModule,MatListModule,MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule],
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  userRoles: string [] = [];
  showPotvrde: boolean = false;
  slikaUrl: string | null = null;

  constructor(public auth: AuthService, private router: Router,private http: HttpClient) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sidenav && this.sidenav.opened) {
          this.sidenav.close();
        }
    });

    const userId = this.auth.getLoggedInUserId();
    if (userId != null) {
      this.loadProfilePhoto(userId);
    }
  }

  loadProfilePhoto(userId: number): void {
    const url = `http://localhost:8080/api/photos/photo/${userId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        this.slikaUrl = URL.createObjectURL(blob);
      },
      error: (err) => {
        console.warn('No profile image found or failed to load.', err);
      }
    });
  }

  ngOnInit(): void {
    this.auth.userRole$.subscribe(roles => {
      this.userRoles = roles;
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
