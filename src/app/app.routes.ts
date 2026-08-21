import { Routes } from '@angular/router';
import { accessGuard } from './core/guards/access.guard';

export const routes: Routes = [
  {
    path: 'intro',
    loadComponent: () =>
      import('./features/intro/pages/intro-page/intro-page').then((module) => module.IntroPage),
    title: 'Our Story',
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/entrance/pages/entrance-page/entrance-page').then(
        (module) => module.EntrancePage,
      ),
    title: 'Welcome | Our Story',
  },
  {
    path: 'browse',
    canActivate: [accessGuard],
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((module) => module.HomePage),
    title: 'Our Anniversary',
  },
  { path: '', pathMatch: 'full', redirectTo: 'intro' },
  { path: '**', redirectTo: 'welcome' },
];
