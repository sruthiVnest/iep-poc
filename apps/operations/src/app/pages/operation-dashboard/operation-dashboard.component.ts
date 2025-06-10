import { Component } from '@angular/core';
import { FilterProjectsComponent } from '../../shared/filter-projects/filter-projects.component';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { IspoComponent } from '../../modules/ispo/ispo.component';

@Component({
  selector: 'app-operation-dashboard',
  standalone: true,
  templateUrl: './operation-dashboard.component.html',
  styleUrls: ['./operation-dashboard.component.scss'],
  imports: [FilterProjectsComponent, TabStripModule, IspoComponent],
})
export class OperationDashboardComponent {
  lastUpdated = '2025-06-03 10:00 AM';
  completion = 72; // Example percentage
}
