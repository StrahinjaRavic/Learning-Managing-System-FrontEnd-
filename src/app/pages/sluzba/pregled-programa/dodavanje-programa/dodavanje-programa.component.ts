import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudijskiProgramService } from '../../../../services/studijski-program.service';
import { StudijskiProgram } from '../../../../Model/studijskiprogram';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatButtonModule }    from '@angular/material/button';
import { MatDialogModule }    from '@angular/material/dialog';
import { MatIconModule }      from '@angular/material/icon';
import { MatTooltipModule }   from '@angular/material/tooltip';
import { MatOptionModule }    from '@angular/material/core';
import { MatError }           from '@angular/material/form-field';

@Component({
  selector: 'app-dodavanje-programa',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatOptionModule
  ],
  templateUrl: './dodavanje-programa.component.html',
  styleUrl: './dodavanje-programa.component.scss'
})
export class DodavanjeProgramaComponent implements OnInit{

  studijskiProgrami: StudijskiProgram[] = [];
  form!: FormGroup;

  constructor(private studijskiProgramService: StudijskiProgramService,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<DodavanjeProgramaComponent>){}

  ngOnInit(): void {

    this.form = this.fb.group({
      godina: ['', [Validators.required, Validators.pattern(/^\d{4}\/\d{4}$/)]],
      studijskiProgram: [null, Validators.required]
    });

    this.studijskiProgramService.getActive().subscribe({
      next: res => {
        this.studijskiProgrami = res
      }
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); 
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
