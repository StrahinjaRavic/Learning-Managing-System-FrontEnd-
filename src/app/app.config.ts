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
          {
            path: 'student-predmeti',
            loadComponent: () =>
              import('./pages/public/student-predmeti/student-predmeti/student-predmeti.component').then(
                (m) => m.StudentPredmetiComponent
              ),
          },
          {
            path: 'istorija-studiranja',
            loadComponent: () =>
              import('./pages/public/istorija-studiranja/istorija-studiranja/istorija-studiranja.component').then(
                (m) => m.IstorijaStudiranjaComponent
              ),
          },
          {
            path: 'forum',
            loadComponent: () => import('./pages/public/forum/forum.component').then(m => m.ForumComponent),
          },
          {
            path: 'forum/:id',
            loadComponent: () => import('./pages/public/forum/obavestenja/obavestenja.component').then(m => m.ObavestenjaComponent),
          },
          {
            path: 'admin',
            loadComponent: () => import('./pages/admin/landing-page/landing-page.component').then(m => m.LandingPageComponent)
          },
          {
            path: 'admin/studijski-programi',
            loadComponent: () => import('./pages/admin/administracija-studijskih-programa/administracija-studijskih-programa.component').then(m => m.AdministracijaStudijskihProgramaComponent),
          },
          {
            path: 'admin/dodavanje',
            loadComponent: () => import('./pages/admin/dodavanje-osobe/dodavanje-osobe.component').then(m => m.DodavanjeOsobeComponent)
          },
          {
            path: 'admin/korisnici',
            loadComponent: () => import('./pages/admin/administracija-registrovanih-korisnika/administracija-registrovanih-korisnika.component').then(m => m.AdministracijaRegistrovanihKorisnikaComponent)
          },
          {
            path: 'admin/sifarnici',
            loadComponent: () => import('./pages/admin/administracija-sifarnika/administracija-sifarnika.component').then(m => m.AdministracijaSifarnikaComponent)
          },
          {
            path: 'admin/nastavnici',
            loadComponent: () => import('./pages/admin/pregled-nastavnika/pregled-nastavnika.component').then(m => m.PregledNastavnikaComponent)
          },
          {
            path: 'admin/studenti',
            loadComponent: () => import('./pages/admin/pregled-studenata/pregled-studenata.component').then(m => m.PregledStudenataComponent)
          },
          {
            path: 'admin/pregled-gresaka',
            loadComponent: () => import('./pages/admin/pregled-gresaka/pregled-gresaka.component').then(m => m.PregledGresakaComponent)
          },
          {
            path: 'nastavnik-predmeti',
            loadComponent: () => import('./pages/public/nastavnik-predmeti/nastavnik-predmeti.component').then(m => m.NastavnikPredmetiComponent)
          },
          {
            path: 'nastavnik/silabus/:predmetId',
            loadComponent: () => import('./pages/public/silabus-edit/silabus-edit.component').then(m => m.SilabusEditComponent)
          },
          {
            path: 'nastavnik/predmet/:predmetId/studenti',
            loadComponent: () => import('./pages/public/studenti-na-predmetu/studenti-na-predmetu.component').then(m => m.StudentiNaPredmetuComponent)
          },
          {
            path: 'student-pretraga',
            loadComponent: () => import('./pages/public/student-pretraga/student-pretraga.component').then(m => m.StudentPretragaComponent)
          },
          {
            path: 'udzbenici',
            loadComponent: () => import('./pages/public/pregled-udzbenika/pregled-udzbenika.component').then(m => m.PregledUdzbenikaComponent)
          },
          {
            path: 'student/biranje-predmeta',
            loadComponent: () => import('./pages/public/student/odabir-predmeta/odabir-predmeta.component').then(m => m.OdabirPredmetaComponent)
          },
          {
            path: 'kancelarijski-materijal',
            loadComponent: () => import('./pages/sluzba/kancelarijski-materijal/kancelarijski-materijal.component').then(m => m.KancelarijskiMaterijalComponent)
          },
          {
            path: 'udzbenici/:id',
            loadComponent: () => import('./pages/public/citanje-knjige/citanje-knjige.component').then(m => m.CitanjeKnjigeComponent)
          },
          {
            path: 'godinastudija/:id/predmeti',
            loadComponent: () => import('./pages/sluzba/pregled-programa/pregled-predmeta/pregled-predmeta.component').then(m => m.PregledPredmetaComponent)
          },
          {
            path: 'sluzba/udzbenici',
            loadComponent: () => import('./pages/sluzba/udzbenik/udzbenik.component').then(m => m.UdzbenikComponent)
          },
          {
            path: 'kreiranje-studenta',
            loadComponent: () => import('./pages/sluzba/dodavanje-studenta/dodavanje-studenta.component').then(m => m.DodavanjeStudentaComponent)
          },
          {
            path: 'upis-studenta',
            loadComponent: () => import('./pages/sluzba/upis-studenta/upis-studenta.component').then(m => m.UpisStudentaComponent)
          },
          {
            path: 'potvrda-o-studiranju',
            loadComponent: () => import('./pages/sluzba/izdavanje-potvrde-studiranja/izdavanje-potvrde-studiranja.component').then(m => m.IzdavanjePotvrdeStudiranjaComponent)
          },
          {
            path: 'potvrda-o-polozenim-predmetima',
            loadComponent: () => import('./pages/sluzba/izdavanje-potvrde-ispiti/izdavanje-potvrde-ispiti.component').then(m => m.IzdavanjePotvrdeIspitiComponent)
          },
          {
            path: 'pregled-programa',
            loadComponent: () => import('./pages/sluzba/pregled-programa/pregled-programa.component').then(m => m.PregledProgramaComponent)
          },
          {
            path: 'kreiranje-rasporeda/:godinaStudijaId',
            loadComponent: () => import('./pages/sluzba/kreiranje-rasporeda/kreiranje-rasporeda.component').then(m => m.KreiranjeRasporedaComponent)
          },
          {
            path: 'opsta-obavestenja',
            loadComponent: () => import('./pages/sluzba/opsta-obavestenja/opsta-obavestenja.component').then(m => m.OpstaObavestenjaComponent)
          },
          {
            path: 'pregled-rokova',
            loadComponent: () => import('./pages/sluzba/kreiranje-roka/kreiranje-roka.component').then(m => m.KreiranjeRokaComponent)
          },
          {
            path: 'pregled-roka/:id',
            loadComponent: () => import('./pages/sluzba/pregled-roka/pregled-roka.component').then(m => m.PregledRokaComponent)
          },
          {
            path: 'edit-profil',
            loadComponent: () => import('./pages/public/profil-edit/profil-edit.component').then(m => m.ProfilEditComponent)
          },
          {
            path: 'student-detalji/:id',
            loadComponent: () => import('./pages/public/student-detalje/student-detalje.component').then(m => m.StudentDetaljiComponent)
          },
          {
            path: 'izmena-profila',
            loadComponent: () => import('./pages/public/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
          },
          {
            path: 'nastavnik/predmeti/:id/termini',
            loadComponent: () => import('./pages/public/termin/termin.component').then(m => m.TerminComponent)
          },
          {
            path: 'prijava-ispita',
            loadComponent: () => import('./pages/public/prijava-polaganja/prijava-polaganja.component').then(m => m.PrijavaPolaganjaComponent)
          },
          {
            path: 'unesi-ocenu/:studentId',
            loadComponent: () => import('./pages/public/unesi-ocenu/unesi-ocenu.component').then(m => m.UnesiOcenuComponent)
          },
          {
            path: 'predmeti/:id/evaluacije',
            loadComponent: () => import('./pages/public/predmet-evaluacije-component/predmet-evaluacije-component.component').then(m => m.PredmetEvaluacijeComponent)
          },
          {
            path: 'nastavnik/prijave/rezultati',
            loadComponent: () => import('./pages/public/prijava-results/prijava-results.component').then(m => m.PrijavaResultsComponent)
          },
          {
            path: 'polaganje/:id',
            loadComponent: () => import('./pages/public/student/polaganje/polaganje.component').then(m => m.PolaganjeComponent)
          },
          {
            path: 'izvestaj',
            loadComponent: () => import('./pages/public/izvestaj-polaganja/izvestaj-polaganja.component').then(m => m.IzvestajPolaganjaComponent)
          },
          {
            path: 'unauthorized',
            loadComponent: () => import('./pages/public/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
          },
          {
            path: '**',
            loadComponent: () => import('./pages/public/not-found/not-found.component').then(m => m.NotFoundComponent)
          }
        ],
      },
    ]),
    provideHttpClient(withFetch()),
  ],
};
