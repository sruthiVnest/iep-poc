import { Component } from '@angular/core';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { IspoComponent } from '../../modules/ispo/ispo.component';
import { CommonModule } from '@angular/common';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { DovsbuyComponent } from '../dovsbuy/dovsbuy.component';
import { SharedUiIepFilterContractComponent } from '@shared-ui/iep-filter-contract';
import { FormsModule } from '@angular/forms';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import {
  KENDO_PROGRESSBARS,
  ProgressColor,
} from "@progress/kendo-angular-progressbar";
@Component({
  selector: 'app-operation-dashboard',
  standalone: true,
  templateUrl: './operation-dashboard.component.html',
  styleUrls: ['./operation-dashboard.component.scss'],
  imports: [SharedUiIepFilterContractComponent, TabStripModule, IspoComponent, CommonModule,
     KENDO_DIALOG,KENDO_INPUTS, DovsbuyComponent,FormsModule, KENDO_PROGRESSBARS],
})
export class OperationDashboardComponent {
  lastUpdated = '2025-06-03 10:00 AM';
  completion = 72; // Example percentage

  public animation = true;
  public colors: ProgressColor[] = [
    {
      from: 0,
      to: 25,
      color: "#F42E17",
    },
    {
      from: 25,
      to: 50,
      color: "#F8DE7E",
    },
    {
      from: 50,
      to: 75,
      color: "#F2E349",
    },
    {
      from: 75,
      to: 100,
      color: "#4A9E24",
    },
  ];
  dashboard_expand = false;
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
  openDoVsBuyDialog() {
    this.doVsBuyDialogOpen = true;
  }

  closeDoVsBuyDialog() {
    this.doVsBuyDialogOpen = false;
  }
}
