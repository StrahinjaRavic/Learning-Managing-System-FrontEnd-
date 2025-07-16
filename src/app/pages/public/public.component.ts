import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(public auth: AuthService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sidenav && this.sidenav.opened) {
          this.sidenav.close();
        }
      });
  }

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
