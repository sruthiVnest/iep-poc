import { Component } from '@angular/core';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { NcrComponent } from '../ncr/ncr.component';
import { SharedUiIepFilterContractComponent } from '@shared-ui/iep-filter-contract';
import { OtrdrComponent } from '../otrdr/otrdr.component';
@Component({
  selector: 'quality-dashboard',
  standalone: true,
  templateUrl: './quality-dashboard.component.html',
  styleUrls: ['./quality-dashboard.component.scss'],
  imports: [SharedUiIepFilterContractComponent, TabStripModule,  CommonModule, KENDO_DIALOG,NcrComponent,OtrdrComponent],
  
})
export class QualityDashboardComponent {
    lastUpdated = '2025-06-03 10:00 AM';
  completion = 72; 
   dashboard_expand = false;
   
  ngOnInit() {
      window.addEventListener('filterProjectsCollapse', (event: any) => {
      this.dashboard_expand = event.detail.collapsed;
    });
  }

  openKaizenPage() {
    window.open('https://kaizen.example.com', '_blank');
  }
}
