import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule],
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {
  userRoles: string [] = [];

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.userRole$.subscribe(roles => {
      this.userRoles = roles;
      console.log('User role:', this.auth.getUserRoles());
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
