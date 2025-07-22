import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.scss'
})
export class AccountDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { username: string; password: string }) {}
}
