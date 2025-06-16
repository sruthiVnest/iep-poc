import { Component } from '@angular/core';
import { FilterProjectsComponent } from '../../shared/filter-projects/filter-projects.component';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { IspoComponent } from '../../modules/ispo/ispo.component';
import { CommonModule } from '@angular/common';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { DovsbuyComponent } from '../dovsbuy/dovsbuy.component';

@Component({
  selector: 'app-operation-dashboard',
  standalone: true,
  templateUrl: './operation-dashboard.component.html',
  styleUrls: ['./operation-dashboard.component.scss'],
  imports: [FilterProjectsComponent, TabStripModule, IspoComponent, CommonModule, KENDO_DIALOG, DovsbuyComponent],
})
export class OperationDashboardComponent {
  lastUpdated = '2025-06-03 10:00 AM';
  completion = 72; // Example percentage
  dashboard_expand = false;
  public doVsBuyDialogOpen = false;

  ngOnInit() {
      window.addEventListener('filterProjectsCollapse', (event: any) => {
      this.dashboard_expand = event.detail.collapsed;
    });
  }

  openDoVsBuyDialog() {
    this.doVsBuyDialogOpen = true;
  }

  closeDoVsBuyDialog() {
    this.doVsBuyDialogOpen = false;
  }
}
