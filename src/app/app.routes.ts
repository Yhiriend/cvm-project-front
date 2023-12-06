import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../modules/core/layout/app-layout.component'),
  },
  {
    path: 'auth/:accessType',
    loadComponent: () =>
      import(
        '../modules/user/components/authentication/authentication.component'
      ),
  },
];
