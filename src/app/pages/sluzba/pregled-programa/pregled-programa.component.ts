import { Component, OnInit } from '@angular/core';
import { GodinaStudijaService } from '../../../services/godina-studija.service';
import { GodinaStudija } from '../../../Model/godinastudija';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-pregled-programa',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,MatMenuModule,FormsModule,MatFormFieldModule,MatInputModule,MatCheckboxModule],
  templateUrl: './pregled-programa.component.html',
  styleUrl: './pregled-programa.component.scss'
})
export class PregledProgramaComponent implements OnInit{

  godineStudija: GodinaStudija[] = [];
  displayedColumns: string[] = ['godina', 'studijskiProgram','akcije'];

  constructor(private godinaStudijaService: GodinaStudijaService,private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.godinaStudijaService.getActive().subscribe({
      next:res =>{
        this.godineStudija = res;
      },
      error: err =>{
        console.log("greska pri ucitavanju godina studija:", err)
      }
    })
  }

  otvoriRaspored(godinaStudijaId: number) {
    this.router.navigate(['/kreiranje-rasporeda', godinaStudijaId]);
  }

}
