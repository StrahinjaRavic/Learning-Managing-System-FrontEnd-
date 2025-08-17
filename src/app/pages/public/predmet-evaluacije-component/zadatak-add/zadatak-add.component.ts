import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-zadatak-add',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  templateUrl: './zadatak-add.component.html',
  styleUrl: './zadatak-add.component.scss'
})
export class ZadatakAddComponent {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ZadatakAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { evaluacijaId: number }
  ) {
    this.forma = this.fb.group({
      pitanje: ['', Validators.required],
      odgovori: this.fb.array([
        this.fb.group({
          odgovor: ['', Validators.required],
          tacan: [false]
        })
      ],[this.atLeastOneCheckedValidator])
    });
  }

  get odgovoriControls() {
    return (this.forma.get('odgovori') as FormArray).controls as FormGroup[];
  }

  dodajOdgovor() {
    (this.forma.get('odgovori') as FormArray).push(
      this.fb.group({ odgovor: ['', Validators.required], tacan: [false] })
    );
  }

  ukloniOdgovor(index: number) {
    (this.forma.get('odgovori') as FormArray).removeAt(index);
  }

  sacuvaj() {
    if (this.forma.invalid) return;
    this.dialogRef.close(this.forma.value);
  }

  atLeastOneCheckedValidator(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray;
    const hasChecked = formArray.controls.some(c => c.get('tacan')?.value === true);
    return hasChecked ? null : { atLeastOneChecked: true };
  }

  otkazi() {
    this.dialogRef.close();
  }
}
