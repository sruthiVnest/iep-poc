import { Route } from '@angular/router';
import { OperationDashboardComponent } from '../pages/operation-dashboard/operation-dashboard.component';

export const remoteRoutes: Route[] = [
  { path: '', component: OperationDashboardComponent, title: 'Operations' },

];
