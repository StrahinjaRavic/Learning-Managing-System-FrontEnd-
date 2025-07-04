import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatToolbarModule, MatMenuModule, MatTooltipModule],
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {
  userRoles: string [] = [];

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.userRole$.subscribe(roles => {
      console.log('roles from userRole$:', roles);
      this.userRoles = roles;
      console.log('User role:', this.auth.getUserRoles());
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
