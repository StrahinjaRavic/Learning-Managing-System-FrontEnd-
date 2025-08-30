import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForumService } from '../../../../services/forum.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dodaj-podforum-dialog',
  template: `
    <h2 mat-dialog-title>Dodaj podforum</h2>
    <mat-dialog-content [formGroup]="forma">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Naziv podforuma</mat-label>
        <input matInput formControlName="naziv">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="zatvori()">Otkaži</button>
      <button mat-raised-button color="primary" (click)="dodajPodforum()" [disabled]="forma.invalid">Sačuvaj</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class DodajPodforumDialog {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService,
    public dialogRef: MatDialogRef<DodajPodforumDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { roditeljskiForumId: number }
  ) {
    this.forma = this.fb.group({
      naziv: ['', Validators.required]
    });
  }

  dodajPodforum() {
    const naziv = this.forma.value.naziv;
    this.forumService.dodajPodforum(this.data.roditeljskiForumId, naziv).subscribe({
      next: res => this.dialogRef.close(true),
      error: err => console.error('Greška pri dodavanju podforuma:', err)
    });
  }

  zatvori() {
    this.dialogRef.close(false);
  }
}
