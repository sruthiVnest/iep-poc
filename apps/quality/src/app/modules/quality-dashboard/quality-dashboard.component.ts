import { Component } from '@angular/core';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { NcrComponent } from '../ncr/ncr.component';
import { SharedUiIepFilterContractComponent } from '@shared-ui/iep-filter-contract';
import { OtrdrComponent } from '../otrdr/otrdr.component';
import { EcnComponent } from '../ecn/ecn.component';
import { DovsbuyComponent } from '@copilot-iep-nx/shared-ui/iep-dovsbuy';
import { FormsModule } from '@angular/forms';
import { KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
@Component({
  selector: 'quality-dashboard',
  standalone: true,
  templateUrl: './quality-dashboard.component.html',
  styleUrls: ['./quality-dashboard.component.scss'],
  imports: [
    SharedUiIepFilterContractComponent,
    TabStripModule,
    DovsbuyComponent,
    CommonModule,
    EcnComponent,
    KENDO_DIALOG,
    NcrComponent,
    OtrdrComponent,
    FormsModule,
    KENDO_TEXTBOX
  ],
})
export class QualityDashboardComponent {
  lastUpdated = '2025-06-03 10:00 AM';
  completion = 72;
  dashboard_expand = false;
  showIcon: boolean = false;
  public doVsBuyDialogOpen = false;
  public searchValue: string = '';
  ngOnInit() {
    window.addEventListener('filterProjectsCollapse', (event: any) => {
      this.dashboard_expand = event.detail.collapsed;
    });
  }
  public onFilter(value: string): void {
    const inputValue = value.toLowerCase();
   
    if (!inputValue) {
      return;
    }
  
  }

  openKaizenPage() {
    window.open('https://kaizen.example.com', '_blank');
  }
  onSelect(e: any) {
    if (e.title === 'ECN/ECR') {
      this.showIcon = true;
    } else {
      this.showIcon = false;
    }
  }
  openDoVsBuyDialog() {
    this.doVsBuyDialogOpen = true;
  }

  closeDoVsBuyDialog() {
    this.doVsBuyDialogOpen = false;
  }
}
