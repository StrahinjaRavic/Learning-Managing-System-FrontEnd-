import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { PravoPristupa } from '../../../../Model/pravopristupa';
import { PravoPristupaService } from '../../../../services/pravo-pristupa.service';
import { DodeljenoPravoPristupaService } from '../../../../services/dodeljeno-pravo-pristupa.service';
import { DodeljenoPravoPristupa } from '../../../../Model/dodeljenopravopristupa';

@Component({
  standalone: true,
  selector: 'app-prava-dialog',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule,MatOptionModule,FormsModule,MatCheckboxModule],
  templateUrl: './prava-dialog.component.html',
  styleUrl: './prava-dialog.component.scss'
})
export class PravaDialogComponent implements OnInit{
  constructor(
    private pravoService: PravoPristupaService,
     private dodeljenoPravoService: DodeljenoPravoPristupaService,
    @Inject(MAT_DIALOG_DATA) public data: { korisnik_id: number }) {}

  pravaPristupa: PravoPristupa[] = []
  dodeljenaPrava: DodeljenoPravoPristupa[] = []
  pravaStanja: { [pravoId: number]: boolean } = {};

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.pravoService.getAll().subscribe({
      next: res => {
        this.pravaPristupa = res;

        this.dodeljenoPravoService.getByKorisnikId(this.data.korisnik_id).subscribe({
          next: res => {
            this.dodeljenaPrava = res;
            for (const pravo of this.pravaPristupa) {
            this.pravaStanja[pravo.id] = this.dodeljenaPrava.some(
              dp => dp.pravoPristupa.id === pravo.id
            );
          }
          },
          error: err => {
            console.error('Greška pri učitavanju dodeljenih prava pristupa:', err);
          }
        });
      },
      error: err => {
        console.error('Greška pri učitavanju prava pristupa:', err);
      }
    });
    console.log(this.pravaPristupa.length)
  }

  save(){

  }
}
