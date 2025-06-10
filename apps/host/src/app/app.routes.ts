import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'operations',
    loadChildren: () => import('operations/Routes').then((m) => m.remoteRoutes),
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard',  loadChildren: () => import('operations/Routes').then((m) => m.remoteRoutes) },
      // Add more protected routes here
    ],
  },
];
