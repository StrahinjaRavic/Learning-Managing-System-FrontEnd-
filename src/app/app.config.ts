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
            path: 'smerovi',
            loadComponent: () =>
              import('./pages/public/smerovi/smerovi.component').then(
                (m) => m.SmeroviComponent
              ),
          },
          {
            path: 'smerovi/:id',
            loadComponent: () =>
              import('./pages/public/smerovi/smer-detalji/smer-detalji.component').then(
                (m) => m.SmerDetaljiComponent
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
            path: 'upis-studenta',
            loadComponent: () =>
              import('./pages/public/osoblje/components/upis-form/upis-form/upis-form.component').then(
                (m) => m.UpisFormComponent
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
            path: 'prijava-ispita',
            loadComponent: () => import('./pages/public/prijava-ispita/prijava-ispita.component').then(m => m.PrijavaIspitaComponent),

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
            loadComponent: () => import('./pages/sluzba/dodavanje-osobe/dodavanje-osobe.component').then(m => m.DodavanjeOsobeComponent)
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
            path: 'prijava',
            loadComponent: () => import('./pages/public/prijava-polaganja/prijava-polaganja.component').then(m => m.PrijavaPolaganjaComponent)
          },
          {
            path: 'unesi-ocenu/:studentId',
            loadComponent: () => import('./pages/public/unesi-ocenu/unesi-ocenu.component').then(m => m.UnesiOcenuComponent)
          },{
            path: '**',
            loadComponent: () => import('./pages/public/not-found/not-found.component').then(m => m.NotFoundComponent)
}

        ],
      },
    ]),
    provideHttpClient(withFetch()),
  ],
};
