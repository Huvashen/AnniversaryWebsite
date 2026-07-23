import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then(
        (module) => module.HomePage,
      ),
    title: 'Our Anniversary',
  },
  { path: '**', redirectTo: '' },
];
