import { Route } from '@angular/router';
import { LoginComponent } from './features/myID/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { authGuard } from './auth.guard';
import { LoadingComponent } from './pages/loading/loading.component';

export const appRoutes: Route[] = [
  {
    path: 'quality',
    loadChildren: () => import('quality/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'operations',
    loadChildren: () => import('operations/Routes').then((m) => m.remoteRoutes),
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'loading', component: LoadingComponent},
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('operations/Routes').then((m) => m.remoteRoutes),
      },
       {
        path: 'quality-dashboard',
        loadChildren: () =>
          import('quality/Routes').then((m) => m.remoteRoutes),
      },
      // Add more protected routes here
    ],
  },
];
