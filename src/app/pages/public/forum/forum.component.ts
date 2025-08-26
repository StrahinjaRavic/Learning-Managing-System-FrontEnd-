import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import { AuthService } from '../../../services/auth.service';
import { Forum } from '../../../Model/forum';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-moji-forumi',
  standalone: true,
  templateUrl: 'forum.component.html',
  imports: [CommonModule, RouterModule, MatCardModule, MatListModule, MatIconModule]
})
export class ForumComponent implements OnInit {
  forumi: Forum[] = [];
  userId!: number;
  isSluzba: boolean = false;

  constructor(private forumService: ForumService, private authService: AuthService) {}

  ngOnInit(): void {
  this.userId = this.authService.getLoggedInUserId()!;
  const roles = this.authService.getUserRoles();

  const isSluzba = roles.includes('ROLE_SLUZBA');

  this.forumService.getMojiForumi(this.userId, isSluzba).subscribe({
    next: res => this.forumi = res,
    error: err => console.error('Greška prilikom učitavanja foruma:', err)
  });
}

}
