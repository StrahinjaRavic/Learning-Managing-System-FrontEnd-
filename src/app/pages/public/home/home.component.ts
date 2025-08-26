import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SifarnikService } from '../../../services/sifarnik.service';
import { Sifarnik } from '../../../Model/sifarnik';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{

  sifarnici: Sifarnik[] = [];
  univerzitet1: string = '';
  univerzitet2: string = '';
  kontaktTelefon: string = '';
  kontaktEmail: string = '';
  kontaktAdresa: string = '';

  constructor(private sifarnikService: SifarnikService){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    
    
    this.sifarnikService.getActive().subscribe({
      next: (res: Sifarnik[]) => {

        this.univerzitet1 =
          res.find((s) => s.naziv.toLowerCase() === 'univerzitet 1')?.tekst ||
          '';

        this.univerzitet2 =
          res.find((s) => s.naziv.toLowerCase() === 'univerzitet 2')?.tekst ||
          '';

        const kontakt =
          res.find(
            (s) => s.naziv.toLowerCase() === 'univerzitet kontakt'
          )?.tekst || '';
        if (kontakt) {
          const telMatch = kontakt.match(/Telefon:\s*([^EmailAdresa]+)/);
          const emailMatch = kontakt.match(/Email:\s*([^]+?)(?=Adresa:|$)/);
          const adresaMatch = kontakt.match(/Adresa:\s*(.+)/);


          this.kontaktTelefon = telMatch ? telMatch[1].trim() : '';
          this.kontaktEmail = emailMatch ? emailMatch[1].trim() : '';
          this.kontaktAdresa = adresaMatch ? adresaMatch[1].trim() : '';
        }
      },
    });
  }

}
