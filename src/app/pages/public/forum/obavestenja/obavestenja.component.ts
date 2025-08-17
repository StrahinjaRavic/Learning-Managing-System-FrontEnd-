import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Obavestenje } from '../../../../Model/obavestenje';
import { ObavestenjeService } from '../../../../services/obavestenje.service';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class ObavestenjaComponent implements OnInit {
  forumId!: number;
  obavestenja: Obavestenje[] = [];
  noviTekst: string = '';
  noviNaslov: string = '';
  isNastavnik: boolean = false;

  editModeId: number | null = null;
  izmenjeniNaslov: string = '';
  izmenjeniTekst: string = '';

  constructor(
    private route: ActivatedRoute,
    private obavestenjeService: ObavestenjeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.forumId = Number(this.route.snapshot.paramMap.get('id'));
    this.ucitajObavestenja();
    const roles = this.authService.getUserRoles();
<<<<<<< HEAD
    this.isNastavnik = roles.includes('ROLE_PROFESOR');
=======
    this.isNastavnik = roles.includes('ROLE_NASTAVNIK');
>>>>>>> main
  }

  ucitajObavestenja(): void {
    this.obavestenjeService.getByForumId(this.forumId).subscribe(data => {
      this.obavestenja = data;
    });
  }

  dodajObavestenje(): void {
    const username = this.authService.getUsernameFromToken();
    if (!username) return;
    if (!this.noviNaslov.trim() || !this.noviTekst.trim()) return;

    this.authService.getUserIdByUsername(username).subscribe(userId => {
      this.obavestenjeService.create({
        naslov: this.noviNaslov,
        tekstObavjestenja: this.noviTekst,
        vremePostavljanja: new Date().toISOString(),
        forum_id: this.forumId,
        ulogovaniKorisnik_id: userId,
        obrisano: false
      }).subscribe(() => {
        this.ucitajObavestenja();
        this.noviTekst = '';
        this.noviNaslov = '';
      });
    });
  }

  obrisiObavestenje(id: number): void {
    this.obavestenjeService.delete(id).subscribe(() => {
      this.ucitajObavestenja();
    });
  }

  pokreniIzmenu(obavestenje: Obavestenje): void {
    this.editModeId = obavestenje.id;
    this.izmenjeniNaslov = obavestenje.naslov;
    this.izmenjeniTekst = obavestenje.tekstObavjestenja;
  }

  otkaziIzmenu(): void {
    this.editModeId = null;
    this.izmenjeniNaslov = '';
    this.izmenjeniTekst = '';
  }

  sacuvajIzmenu(id: number): void {
    const username = this.authService.getUsernameFromToken();
    if (!username) return;

    this.authService.getUserIdByUsername(username).subscribe(userId => {
      this.obavestenjeService.update(id, {
        id,
        naslov: this.izmenjeniNaslov,
        tekstObavjestenja: this.izmenjeniTekst,
        vremePostavljanja: new Date().toISOString(),
        forum_id: this.forumId,
        ulogovaniKorisnik_id: userId,
        obrisano: false
      }).subscribe(() => {
        this.ucitajObavestenja();
        this.otkaziIzmenu();
      });
    });
  }
}
