import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { PravoPristupa } from '../../../../Model/pravopristupa';

@Component({
  standalone: true,
  selector: 'app-prava-dialog',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './prava-dialog.component.html',
  styleUrl: './prava-dialog.component.scss'
})
export class PravaDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { prava: PravoPristupa[] }) {}


  ngOnInit(): void {
  }

}
