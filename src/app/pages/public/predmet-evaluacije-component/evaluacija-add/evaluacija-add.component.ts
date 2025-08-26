import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-evaluacija-add',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule],
  templateUrl: './evaluacija-add.component.html',
  styleUrl: './evaluacija-add.component.scss'
})
export class EvaluacijaAddComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EvaluacijaAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { naziv: string; title: string },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      naziv: [data.naziv ?? null, Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      const naziv = this.form.value.naziv;
      this.dialogRef.close(naziv);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
