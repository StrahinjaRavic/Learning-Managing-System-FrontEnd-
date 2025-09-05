import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { roleGuard } from './services/role.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        loadComponent: () =>
          import('./pages/public/public.component').then(
            (m) => m.PublicComponent
          ),
        children: [
          // JAVNE RUTE - bez guard-a
          {
            path: '',
            loadComponent: () =>
              import('./pages/public/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
          {
            path: 'login',
            loadComponent: () =>
              import('./pages/public/login/login.component').then(
                (m) => m.LoginComponent
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./pages/public/register/register.component').then(
                (m) => m.RegisterComponent
              ),
          },
          {
            path: 'fakultet',
            loadComponent: () =>
              import('./pages/public/fakultet-info/fakultet-info.component').then(
                (m) => m.FakultetInfoComponent
              ),
          },
          {
            path: 'fakultet/katedra/:id',
            loadComponent: () =>
              import('./pages/public/katedra-studijski-programi/katedra-studijski-programi.component').then(
                (m) => m.KatedraStudijskiProgramiComponent
              ),
          },
          {
            path: 'studijski-programi',
            loadComponent: () =>
              import('./pages/public/studijski-programi/studijski-programi.component').then(
                (m) => m.StudijskiProgramiComponent
              ),
          },
          {
            path: 'studijski-programi/:id',
            loadComponent: () =>
              import('./pages/public/studijski-programi/studijski-program-detalji/studijski-program-detalji.component').then(
                (m) => m.StudijskiProgramDetaljiComponent
              ),
          },

          // STUDENT RUTE
          {
            path: 'student-predmeti',
            loadComponent: () =>
              import('./pages/student/student-predmeti/student-predmeti.component').then(
                (m) => m.StudentPredmetiComponent
              ),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT'] }
          },
          {
            path: 'istorija-studiranja',
            loadComponent: () =>
              import('./pages/student/istorija-studiranja/istorija-studiranja.component').then(
                (m) => m.IstorijaStudiranjaComponent
              ),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT'] }
          },
          {
            path: 'student/biranje-predmeta',
            loadComponent: () => 
              import('./pages/student/odabir-predmeta/odabir-predmeta.component').then(m => m.OdabirPredmetaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT'] }
          },
          {
            path: 'prijava-ispita',
            loadComponent: () => 
              import('./pages/student/prijava-polaganja/prijava-polaganja.component').then(m => m.PrijavaPolaganjaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT'] }
          },
          {
            path: 'polaganje/:id',
            loadComponent: () => 
              import('./pages/student/polaganje/polaganje.component').then(m => m.PolaganjeComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT'] }
          },

          // NASTAVNIK RUTE
          {
            path: 'nastavnik-predmeti',
            loadComponent: () => 
              import('./pages/profesor/nastavnik-predmeti/nastavnik-predmeti.component').then(m => m.NastavnikPredmetiComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK'] }
          },
          {
            path: 'nastavnik/silabus/:predmetId',
            loadComponent: () => 
              import('./pages/profesor/silabus-edit/silabus-edit.component').then(m => m.SilabusEditComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK'] }
          },
          {
            path: 'nastavnik/predmet/:predmetId/studenti',
            loadComponent: () => 
              import('./pages/profesor/studenti-na-predmetu/studenti-na-predmetu.component').then(m => m.StudentiNaPredmetuComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK'] }
          },
          {
            path: 'nastavnik/predmeti/:id/termini',
            loadComponent: () => 
              import('./pages/profesor/termin/termin.component').then(m => m.TerminComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK'] }
          },
          {
            path: 'unesi-ocenu/:studentId/:realizacijaPredmetaId',
            loadComponent: () => 
              import('./pages/profesor/unesi-ocenu/unesi-ocenu.component').then(m => m.UnesiOcenuComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK'] }
          },
          {
            path: 'predmeti/:id/evaluacije',
            loadComponent: () => 
              import('./pages/profesor/predmet-evaluacije-component/predmet-evaluacije-component.component').then(m => m.PredmetEvaluacijeComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK'] }
          },
          {
            path: 'nastavnik/prijave/rezultati',
            loadComponent: () => 
              import('./pages/public/prijava-results/prijava-results.component').then(m => m.PrijavaResultsComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK'] }
          },
          {
            path: 'izvestaj',
            loadComponent: () => 
              import('./pages/sluzba/izvestaj-polaganja/izvestaj-polaganja.component').then(m => m.IzvestajPolaganjaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },

          // ADMIN RUTE
          {
            path: 'admin',
            loadComponent: () => 
              import('./pages/admin/landing-page/landing-page.component').then(m => m.LandingPageComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },
          {
            path: 'admin/studijski-programi',
            loadComponent: () => 
              import('./pages/admin/administracija-studijskih-programa/administracija-studijskih-programa.component').then(m => m.AdministracijaStudijskihProgramaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },
          {
            path: 'admin/dodavanje',
            loadComponent: () => 
              import('./pages/admin/dodavanje-osobe/dodavanje-osobe.component').then(m => m.DodavanjeOsobeComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },
          {
            path: 'admin/korisnici',
            loadComponent: () => 
              import('./pages/admin/administracija-registrovanih-korisnika/administracija-registrovanih-korisnika.component').then(m => m.AdministracijaRegistrovanihKorisnikaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },
          {
            path: 'admin/sifarnici',
            loadComponent: () => 
              import('./pages/admin/administracija-sifarnika/administracija-sifarnika.component').then(m => m.AdministracijaSifarnikaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },
          {
            path: 'admin/nastavnici',
            loadComponent: () => 
              import('./pages/admin/pregled-nastavnika/pregled-nastavnika.component').then(m => m.PregledNastavnikaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },
          {
            path: 'admin/studenti',
            loadComponent: () => 
              import('./pages/admin/pregled-studenata/pregled-studenata.component').then(m => m.PregledStudenataComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },
          {
            path: 'admin/pregled-gresaka',
            loadComponent: () => 
              import('./pages/admin/pregled-gresaka/pregled-gresaka.component').then(m => m.PregledGresakaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_ADMIN'] }
          },

          // SLUZBA RUTE
          {
            path: 'kancelarijski-materijal',
            loadComponent: () => 
              import('./pages/sluzba/kancelarijski-materijal/kancelarijski-materijal.component').then(m => m.KancelarijskiMaterijalComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'sluzba/udzbenici',
            loadComponent: () => 
              import('./pages/sluzba/udzbenik/udzbenik.component').then(m => m.UdzbenikComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'kreiranje-studenta',
            loadComponent: () => 
              import('./pages/sluzba/dodavanje-studenta/dodavanje-studenta.component').then(m => m.DodavanjeStudentaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'upis-studenta',
            loadComponent: () => 
              import('./pages/sluzba/upis-studenta/upis-studenta.component').then(m => m.UpisStudentaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'potvrda-o-studiranju',
            loadComponent: () => 
              import('./pages/sluzba/izdavanje-potvrde-studiranja/izdavanje-potvrde-studiranja.component').then(m => m.IzdavanjePotvrdeStudiranjaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'potvrda-o-polozenim-predmetima',
            loadComponent: () => 
              import('./pages/sluzba/izdavanje-potvrde-ispiti/izdavanje-potvrde-ispiti.component').then(m => m.IzdavanjePotvrdeIspitiComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'pregled-programa',
            loadComponent: () => 
              import('./pages/sluzba/pregled-programa/pregled-programa.component').then(m => m.PregledProgramaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'kreiranje-rasporeda/:godinaStudijaId',
            loadComponent: () => 
              import('./pages/sluzba/kreiranje-rasporeda/kreiranje-rasporeda.component').then(m => m.KreiranjeRasporedaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'pregled-rokova',
            loadComponent: () => 
              import('./pages/sluzba/kreiranje-roka/kreiranje-roka.component').then(m => m.KreiranjeRokaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'pregled-roka/:id',
            loadComponent: () => 
              import('./pages/sluzba/pregled-roka/pregled-roka.component').then(m => m.PregledRokaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'godinastudija/:id/predmeti',
            loadComponent: () => 
              import('./pages/sluzba/pregled-programa/pregled-predmeta/pregled-predmeta.component').then(m => m.PregledPredmetaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },

          // RUTE DOSTUPNE SVIM REGISTROVANIM KORISNICIMA
          {
            path: 'opsta-obavestenja',
            loadComponent: () => 
              import('./pages/sluzba/opsta-obavestenja/opsta-obavestenja.component').then(m => m.OpstaObavestenjaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT', 'ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'forum',
            loadComponent: () => 
              import('./pages/public/forum/forum.component').then(m => m.ForumComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT', 'ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'forum/:id',
            loadComponent: () => 
              import('./pages/public/forum/obavestenja/obavestenja.component').then(m => m.ObavestenjaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT', 'ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'edit-profil',
            loadComponent: () => 
              import('./pages/public/profil-edit/profil-edit.component').then(m => m.ProfilEditComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT', 'ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'izmena-profila',
            loadComponent: () => 
              import('./pages/public/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_STUDENT', 'ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },

          // RUTE ZA NASTAVNIKE I SLUŽBU
          {
            path: 'student-pretraga',
            loadComponent: () => 
              import('./pages/public/student-pretraga/student-pretraga.component').then(m => m.StudentPretragaComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },
          {
            path: 'student-detalji/:id',
            loadComponent: () => 
              import('./pages/public/student-detalje/student-detalje.component').then(m => m.StudentDetaljiComponent),
            canActivate: [roleGuard],
            data: { roles: ['ROLE_NASTAVNIK', 'ROLE_SLUZBA', 'ROLE_ADMIN'] }
          },

          // JAVNO DOSTUPNE RUTE - pregled udžbenika i čitanje
          {
            path: 'udzbenici',
            loadComponent: () => 
              import('./pages/public/pregled-udzbenika/pregled-udzbenika.component').then(m => m.PregledUdzbenikaComponent)
          },
          {
            path: 'udzbenici/:id',
            loadComponent: () => 
              import('./pages/public/citanje-knjige/citanje-knjige.component').then(m => m.CitanjeKnjigeComponent)
          },

          // ERROR RUTE
          {
            path: 'unauthorized',
            loadComponent: () => 
              import('./pages/public/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
          },
          {
            path: '**',
            loadComponent: () => 
              import('./pages/public/not-found/not-found.component').then(m => m.NotFoundComponent)
          }
        ],
      },
    ]),
    provideHttpClient(withFetch()),
  ],
};