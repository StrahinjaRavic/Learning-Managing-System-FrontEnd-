import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Mesto } from '../../../Model/mesto';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MestoService } from '../../../services/mesto.service';
import { AdresaCreateDTO } from '../../../Model/DTO/AdresaCreateDTO';
import { AdresaService } from '../../../services/adresa.service';
import { OsobaCreateDTO } from '../../../Model/DTO/OsobaCreateDTO';
import { OsobaService } from '../../../services/osoba.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UlogovaniKorisnikService } from '../../../services/ulogovani-korisnik.service';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { PravoPristupa } from '../../../Model/pravopristupa';
import { PravoPristupaService } from '../../../services/pravo-pristupa.service';
import { DodeljenoPravoPristupaService } from '../../../services/dodeljeno-pravo-pristupa.service';
import { DodeljenoPravoPristupaCreateDTO } from '../../../Model/DTO/DodeljenoPravoPristupaCreateDTO';

@Component({
  selector: 'app-dodavanje-osobe',
  standalone: true,
  templateUrl: './dodavanje-osobe.component.html',
  styleUrls: ['./dodavanje-osobe.component.scss'],
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatAutocompleteModule,MatCheckboxModule,MatRadioModule]

})
export class DodavanjeOsobeComponent {
  private fb = inject(FormBuilder);
  mestoControl = new FormControl('', Validators.required);
  private mestoService = inject(MestoService);
  private adresaService = inject(AdresaService)
  private osobaService = inject(OsobaService)
  private pravoService = inject(PravoPristupaService)
  private ulogovaniKorisnikService = inject(UlogovaniKorisnikService)
  private dodeljenoPravoService = inject(DodeljenoPravoPristupaService)
  private dialog = inject(MatDialog)

  mesta: Mesto[] = [];
  filteredMesta: Mesto[] = [];
  prava: PravoPristupa[] = [];
  role_nastavnik_id: number | null = null;
  role_admin_id: number | null = null;

  form = this.fb.group({
    jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
    ime: ['', Validators.required],
    prezime: ['', Validators.required],
    napraviNalog: [false],
    tipNaloga: [1],
    adresa: this.fb.group({
      ulica: ['', Validators.required],
      broj: ['', Validators.required],
      mestoId: [null as number | null, Validators.required]
    })
  });

  ngOnInit(): void {
    this.mestoService.getActive().subscribe({
      next: mesta => this.mesta = mesta,
      error: err => console.error('Greška pri učitavanju mesta:', err)
    });

    this.pravoService.getActive().subscribe({
      next: prava => {
        this.prava = prava;

        const nastavnik = prava.find(p => p.naziv === 'ROLE_NASTAVNIK');
        const admin = prava.find(p => p.naziv === 'ROLE_ADMIN');
  
        this.role_nastavnik_id = nastavnik?.id ?? null;
        this.role_admin_id = admin?.id ?? null;
      },
      error: err => console.error('Greška pri učitavanju prava pristupa:', err)
    });

    this.mestoControl.valueChanges
      .pipe(startWith(''))
      .subscribe(value => {
        const filterValue = value?.toLowerCase() ?? '';
        this.filteredMesta = this.mesta.filter(m =>
          m.naziv.toLowerCase().includes(filterValue)
        );
      });
  }

  onMestoSelected(selectedNaziv: string) {
    const selectedMesto = this.mesta.find(m => m.naziv === selectedNaziv);
    if (selectedMesto) {
      this.form.get('adresa')?.get('mestoId')?.setValue(selectedMesto.id);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const adresaData: AdresaCreateDTO = {
      ulica: this.form.get('adresa.ulica')?.value!,
      broj: this.form.get('adresa.broj')?.value!,
      mesto_id: this.form.get('adresa.mestoId')?.value!
    };
    // kreiranje adrese
    this.adresaService.create(adresaData).subscribe({
          next: adresa => {
            const osobaData: OsobaCreateDTO = {
              jmbg: this.form.get('jmbg')?.value!,
              ime: this.form.get('ime')?.value!,
              prezime: this.form.get('prezime')?.value!,
              adresa_id: adresa.id,
              nastavnik_id: null,
              student_id: null
            };
            // kreiranje osobe nakon sto je kreirana adresa
            this.osobaService.create(osobaData).subscribe({
              next: createdOsoba => {
                console.log('Uspešno kreirana osoba:', createdOsoba);
                // provera da li korisnik zeli da nalog bude napravljen
                const napraviNalog = this.form.get('napraviNalog')?.value;
                if (napraviNalog) {

                  const korisnickoIme = `${createdOsoba.ime}_${createdOsoba.prezime}`;
                  const lozinka = createdOsoba.jmbg;

                  const nalog = {
                    korisnickoIme,
                    lozinka,
                    email: null,
                    osoba_id: createdOsoba.id
                  };
                  console.log('Pravim nalog za osobu:', createdOsoba.id);
                  // kreiranje naloga za osobu
                  this.ulogovaniKorisnikService.create(nalog).subscribe({
                    next: nalog => {
                      this.dialog.open(AccountDialogComponent, {
                        data: {
                          username: nalog.korisnickoIme,
                          password: nalog.lozinka
                        }
                      });
                        console.log('tipNaloga raw value:', this.form.get('tipNaloga')?.value);
                        console.log('typeof tipNaloga:', typeof this.form.get('tipNaloga')?.value);
                      const dodeljeno: DodeljenoPravoPristupaCreateDTO = {
                        ulogovaniKorisnik_id: nalog.id,
                        pravoPristupa_id: Number(this.form.get('tipNaloga')?.value)
                      };
                      console.log(this.form.get("tipNaloga"))
                      console.log("DODELJENO PRAVO ID:"+ dodeljeno.pravoPristupa_id)
                      // dodavanje prava pristupa kreiranom nalogu
                      this.dodeljenoPravoService.create(dodeljeno).subscribe({
                        next: response => {

                          console.log('Pravo uspešno dodeljeno:', response);

                          },
                          error: err => {
                            console.error('Greška pri dodeljivanju prava pristupa:', err);
                          }
                        });

                    },
                    error: err => {
                    console.error('Greška pri kreiranju naloga:', err);
                    }
                  });
                }

                
              },
              error: err => {
                console.error('Greška pri kreiranju osobe:', err);
              }
            });
          },
          error: err => {
            console.error('Greška pri kreiranju:', err);
          }
        });
  }
}
