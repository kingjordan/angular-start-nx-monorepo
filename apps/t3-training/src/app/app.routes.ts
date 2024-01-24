import { Route } from '@angular/router';
import { isAuthenticatedGuard } from "@angular-monorepo/utils";
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@angular-monorepo/auth').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard()],
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
