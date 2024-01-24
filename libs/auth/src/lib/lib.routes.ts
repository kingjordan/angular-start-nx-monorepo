import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component'),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
