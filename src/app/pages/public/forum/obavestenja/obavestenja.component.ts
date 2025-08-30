import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, NavigationEnd } from '@angular/router';
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
import { ForumService } from '../../../../services/forum.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NastavnikForumDTO } from '../../../../Model/DTO/nastavnik-forum.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { Forum } from '../../../../Model/forum';
import { filter } from 'rxjs/operators';
import { DodajPodforumDialog } from './podforum-dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    RouterModule,
  ]
})
export class ObavestenjaComponent implements OnInit {
  forumId!: number;
  obavestenja: Obavestenje[] = [];
  userId!: number;

  // Obavestenja
  noviTekst: string = '';
  noviNaslov: string = '';
  editModeId: number | null = null;
  izmenjeniNaslov: string = '';
  izmenjeniTekst: string = '';

  // Korisnici
  korisnici: any[] = [];
  showKorisniciPanel: boolean = false;
  isNastavnik: boolean = false;
  isSluzba: boolean = false;

  // Studenti
  dostupniStudenti: any[] = [];
  filterText: string = '';
  odabraniStudentId!: number;

  // Nastavnici
dostupniNastavnici: any[] = [];
filterNastavnik: string = '';
odabraniNastavnikId!: number|null;

podforumi: Forum[] = [];
  currentForumId!: number;

  constructor(
    private route: ActivatedRoute,
    private obavestenjeService: ObavestenjeService,
    private router: Router,
    private forumService: ForumService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  this.forumId = Number(this.route.snapshot.paramMap.get('id'));
  this.userId = this.authService.getLoggedInUserId()!;
  const roles = this.authService.getUserRoles();
  this.isNastavnik = roles.includes('ROLE_NASTAVNIK');
  this.isSluzba = roles.includes('ROLE_SLUZBA');

  if (this.isSluzba) {
    // Služba uvek može da pristupi
    this.ucitajObavestenja();
    this.ucitajPodforume();
    this.podesiNavigationEndListener();
  } else {
    // Ostali korisnici -> proverava se članstvo
    this.forumService.isMember(this.forumId, this.userId).subscribe({
      next: (isMember) => {
        if (!isMember) {
          this.router.navigate(['/access-denied']);
        } else {
          this.ucitajObavestenja();
          this.ucitajPodforume();
          this.podesiNavigationEndListener();
        }
      },
      error: (err) => {
        console.error('Greška prilikom provere članstva:', err);
        this.router.navigate(['/access-denied']);
      }
    });
  }
}


// izdvojena metoda za podforume da ne ponavljamo kod
ucitajPodforume() {
  this.forumService.getPodforume(this.forumId).subscribe({
    next: res => this.podforumi = res,
    error: err => console.error('Greška prilikom učitavanja podforuma:', err)
  });
}

private podesiNavigationEndListener(): void {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const newForumId = Number(this.route.snapshot.paramMap.get('id'));
      if (newForumId !== this.forumId) {
        this.forumId = newForumId;
        this.ucitajObavestenja();
        this.ucitajPodforume();
      }
    });
}

  // ========== O B A V E Š T E NJ A ==========
  ucitajObavestenja(): void {
    this.obavestenjeService.getByForumId(this.forumId).subscribe(data => {
      this.obavestenja = data;
    });
  }

  dodajObavestenje(): void {
    const userId = this.authService.getUserId();
    if (!userId || !this.noviNaslov.trim() || !this.noviTekst.trim()) return;

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
    const userId = this.authService.getUserId();
    if (!userId) return;

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
  }

  // ========== K O R I S N I C I ==========
  toggleKorisniciPanel(): void {
    this.showKorisniciPanel = !this.showKorisniciPanel;
    if (this.showKorisniciPanel) {
      this.ucitajKorisnike();
      this.ucitajDostupneStudente();
      this.ucitajDostupneNastavnike();
    }
  }

  ucitajKorisnike(): void {
    this.forumService.getKorisniciZaForum(this.forumId).subscribe({
      next: (data) => {
        this.korisnici = data
        console.log(data)
      },
      error: (err) => console.error('Greška pri dohvatanju korisnika:', err)
    });
  }

  get nastavnici() {
    return this.korisnici.filter(k => k.rola === 'ROLE_NASTAVNIK');
  }

  get studenti() {
    return this.korisnici.filter(k => k.rola === 'ROLE_STUDENT');
  }

  // ========== S T U D E N T I ==========
  ucitajDostupneStudente(): void {
    this.forumService.getNeprijavljeniStudentiZaForum(this.forumId).subscribe({
      next: (data) => {
        console.log("studenti",data)
        this.dostupniStudenti = data},
      error: (err) => console.error('Greška pri dohvatanju studenata:', err)
    });
  }

  filtriraniStudenti(): any[] {
    if (!this.filterText) return this.dostupniStudenti;
    const f = this.filterText.toLowerCase();
    return this.dostupniStudenti.filter(s =>
      (s.ime + ' ' + s.prezime).toLowerCase().includes(f) ||
      s.brojIndeksa?.toString().includes(f) ||
      s.jmbg?.includes(f)
    );
  }

  dodajStudenta(): void {
    if (!this.odabraniStudentId) return;

    this.forumService.dodajStudentaNaForum(this.forumId, this.odabraniStudentId).subscribe(() => {
      this.ucitajKorisnike();
      this.ucitajDostupneStudente();
      this.odabraniStudentId = 0;
      this.filterText = '';
    });
  }

  onStudentSelected(student: any) {
    console.log(student)
    this.odabraniStudentId = student.ulogovaniKorisnik_id;
    this.filterText = `${student.ime} ${student.prezime} (${student.brojIndeksa})`;
  }

  ukloniStudenta(studentId: number): void {
    this.forumService.ukloniStudentaSaForuma(this.forumId, studentId).subscribe(() => {
      this.ucitajKorisnike();
      this.ucitajDostupneStudente();
    });
  }

  ucitajDostupneNastavnike(): void {
  this.forumService.getAvailableNastavnici(this.forumId).subscribe({
    next: data => {
      console.log("Dohvaćeni dostupni nastavnici:", data); // 👈 LOG OVDE
      this.dostupniNastavnici = data;
    },
    error: err => console.error('Greška pri dohvatanju dostupnih nastavnika:', err)
  });
}


filtriraniNastavnici(): NastavnikForumDTO[] {
  if (!this.filterNastavnik) return this.dostupniNastavnici;
  const filter = this.filterNastavnik.toLowerCase();
  return this.dostupniNastavnici.filter(n =>
    n.ime.toLowerCase().includes(filter) || n.prezime.toLowerCase().includes(filter)
  );
}

onNastavnikSelected(nastavnik: any) {
    this.odabraniNastavnikId = nastavnik.ulogovaniKorisnikId;
    this.filterNastavnik = `${nastavnik.ime} ${nastavnik.prezime} (${nastavnik.jmbg})`;
  }

dodajNastavnika(): void {
  console.log(this.odabraniNastavnikId)
  if (!this.odabraniNastavnikId) return;

  this.forumService.dodajNastavnikaNaForum(this.forumId, this.odabraniNastavnikId).subscribe({
    next: () => {
      console.log('Nastavnik dodat:', this.odabraniNastavnikId);
      this.ucitajDostupneNastavnike();
      this.ucitajKorisnike();
      this.odabraniNastavnikId = null;
    },
    error: (err) => console.error('Greška pri dodavanju nastavnika', err)
  });
}

ukloniNastavnika(nastavnikId: number): void {
  this.forumService.ukloniNastavnikaSaForuma(this.forumId, nastavnikId).subscribe(() => {
    this.ucitajKorisnike();
    this.ucitajDostupneNastavnike();
  });
}

logOdabraniNastavnik(id: number) {
  console.log('Izabrani nastavnik ID:', id);
}

// Otvaranje dialoga
otvoriDodavanjePodforuma() {
  const dialogRef = this.dialog.open(DodajPodforumDialog, {
    width: '350px',
    data: { roditeljskiForumId: this.forumId }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Ako je uneseno ime, osvežavamo listu podforuma
      this.ucitajPodforume();
    }
  });
}

// Editovanje podforuma
otvoriIzmenuPodforuma(forum: Forum) {
  const noviNaziv = prompt('Izmeni naziv podforuma:', forum.naziv);
  if (noviNaziv?.trim() && noviNaziv.trim() !== forum.naziv) {
    this.forumService.izmeniPodforum(forum.id, noviNaziv.trim()).subscribe({
      next: (izmenjeni) => {
        forum.naziv = izmenjeni.naziv; // ažuriramo lokalno
      },
      error: (err) => console.error('Greška prilikom izmena podforuma:', err)
    });
  }
}

// Brisanje podforuma
obrisiPodforum(podforumId: number) {
  if (confirm('Da li ste sigurni da želite da obrišete ovaj podforum?')) {
    this.forumService.obrisiPodforum(podforumId).subscribe({
      next: () => {
        this.podforumi = this.podforumi.filter(f => f.id !== podforumId);
      },
      error: (err) => console.error('Greška prilikom brisanja podforuma:', err)
    });
  }
}

}
