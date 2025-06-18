import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { StudijskiProgramDetaljiComponent } from './pages/public/studijski-programi/studijski-program-detalji/studijski-program-detalji.component';
import { roleGuard } from './services/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'fakultet',
    loadComponent: () => import('./pages/public/fakultet-info/fakultet-info.component').then(m => m.FakultetInfoComponent)
  },
  {
  path: 'studijski-programi',
  loadComponent: () => import('./pages/public/studijski-programi/studijski-programi.component').then(m => m.StudijskiProgramiComponent)
  },
  {
    path: 'smerovi',
    loadComponent: () => import('./pages/public/smerovi/smerovi.component').then(m => m.SmeroviComponent)
  },
  {
    path: 'smerovi/:id',
    loadComponent: () => import('./pages/public/smerovi/smer-detalji/smer-detalji.component').then(m => m.SmerDetaljiComponent)
  },
  {
  path: 'studijski-programi/:id',
  loadComponent:() => import('./pages/public/studijski-programi/studijski-program-detalji/studijski-program-detalji.component').then(m => m.StudijskiProgramDetaljiComponent)
  },
  {
  path: 'register',
  loadComponent:() => import('./pages/public/register/register.component').then(m => m.RegisterComponent)
  },
  {
  path: 'student-predmeti',
  loadComponent: () => import('./pages/public/student-predmeti/student-predmeti/student-predmeti.component').then(m => m.StudentPredmetiComponent),
  canActivate: [roleGuard],
  data: {roles: ['ROLE_STUDENT']}
  },
  {
  path: 'istorija-predmeta',
  loadComponent: () => import('./pages/public/istorija-studiranja/istorija-studiranja/istorija-studiranja.component').then(m => m.IstorijaStudiranjaComponent)
  },

  {
  path: 'upis-studenta',
  loadComponent: () => import('./pages/public/osoblje/components/upis-form/upis-form/upis-form.component').then( (m) => m.UpisFormComponent),
   canActivate: [roleGuard],
  data: {roles: ['ROLE_NASTAVNIK']}
  }
];
