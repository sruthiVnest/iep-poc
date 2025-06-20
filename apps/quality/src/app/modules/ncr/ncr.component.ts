import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { PagerModule, PageChangeEvent } from '@progress/kendo-angular-pager';
import { SharedUiIepGridComponent } from '@shared-ui/iep-grid';
import { ApiService } from '@shared-service/data-service';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'copilot-iep-nx-ncr',
  standalone: true,
  imports: [CommonModule, ChartsModule, PagerModule, SharedUiIepGridComponent,KENDO_DROPDOWNLIST,FormsModule],
  templateUrl: './ncr.component.html',
  styleUrl: './ncr.component.scss',
})
export class NcrComponent {
  
  private dataService = inject(ApiService);
  public selectedProjects = this.dataService.selectedProjects;
    viewAsOptions = ['Tabular View', 'Chart View'];
  functionsOptions = ['Individual', 'Office', 'Summary'];
   selectedViewAs: string | null = null;
  selectedFunction: string | null = null;
   public showWarning = true;
   public isExpanded = true;
  public isGridExpanded = false;
  public mySelection: string[] = [];
 public dialogOpened = false;
  public searchValue: string = '';
  constructor() {
    effect(() => {
       const selectedProjects = this.dataService.getTreeData();
      // if (selectedProjects && selectedProjects.length > 0) {
      //   const selected = selectedProjects.split(',');
      //   // Only filter if there are selected projects
      //   this.gridView = this.data.filter((row: any) => {
      //     const projectId = row['id'] || row['ProjectID'] || row['projectId'] || row['ProjectId'];
      //     return selected.includes(projectId?.toString());
      //   });
      // } else {
      //   this.gridView = this.data;
      // }
    }); 
  }
  public years = [2020, 2021, 2022, 2023, 2024, 2025];
  
  public pageSize = 1;
  public skip = 0;
  public ncrData = [
    // Example data for each year
    { year: 2020, data: [
      { month: 'Jan', count: 10 }, { month: 'Feb', count: 12 }, { month: 'Mar', count: 8 },
      { month: 'Apr', count: 15 }, { month: 'May', count: 7 }, { month: 'Jun', count: 9 },
      { month: 'Jul', count: 11 }, { month: 'Aug', count: 13 }, { month: 'Sep', count: 6 },
      { month: 'Oct', count: 14 }, { month: 'Nov', count: 10 }, { month: 'Dec', count: 12 }
    ]},
    { year: 2021, data: [
      { month: 'Jan', count: 9 }, { month: 'Feb', count: 11 }, { month: 'Mar', count: 7 },
      { month: 'Apr', count: 13 }, { month: 'May', count: 8 }, { month: 'Jun', count: 10 },
      { month: 'Jul', count: 12 }, { month: 'Aug', count: 14 }, { month: 'Sep', count: 5 },
      { month: 'Oct', count: 13 }, { month: 'Nov', count: 9 }, { month: 'Dec', count: 11 }
    ]},
    { year: 2022, data: [
      { month: 'Jan', count: 8 }, { month: 'Feb', count: 10 }, { month: 'Mar', count: 6 },
      { month: 'Apr', count: 12 }, { month: 'May', count: 9 }, { month: 'Jun', count: 11 },
      { month: 'Jul', count: 13 }, { month: 'Aug', count: 15 }, { month: 'Sep', count: 7 },
      { month: 'Oct', count: 12 }, { month: 'Nov', count: 8 }, { month: 'Dec', count: 10 }
    ]},
    { year: 2023, data: [
      { month: 'Jan', count: 11 }, { month: 'Feb', count: 13 }, { month: 'Mar', count: 9 },
      { month: 'Apr', count: 16 }, { month: 'May', count: 10 }, { month: 'Jun', count: 12 },
      { month: 'Jul', count: 14 }, { month: 'Aug', count: 16 }, { month: 'Sep', count: 8 },
      { month: 'Oct', count: 15 }, { month: 'Nov', count: 11 }, { month: 'Dec', count: 13 }
    ]},
    { year: 2024, data: [
      { month: 'Jan', count: 12 }, { month: 'Feb', count: 14 }, { month: 'Mar', count: 10 },
      { month: 'Apr', count: 17 }, { month: 'May', count: 11 }, { month: 'Jun', count: 13 },
      { month: 'Jul', count: 15 }, { month: 'Aug', count: 17 }, { month: 'Sep', count: 9 },
      { month: 'Oct', count: 16 }, { month: 'Nov', count: 12 }, { month: 'Dec', count: 14 }
    ]},
    { year: 2025, data: [
      { month: 'Jan', count: 13 }, { month: 'Feb', count: 15 }, { month: 'Mar', count: 11 },
      { month: 'Apr', count: 18 }, { month: 'May', count: 12 }, { month: 'Jun', count: 14 },
      { month: 'Jul', count: 16 }, { month: 'Aug', count: 18 }, { month: 'Sep', count: 10 },
      { month: 'Oct', count: 17 }, { month: 'Nov', count: 13 }, { month: 'Dec', count: 15 }
    ]},
  ];

  public showGrid = false;
  public selectedMonth = '';
  public selectedCount = 0;
  public gridData: any[] = [];
  public gridColumns = [
    { field: 'id', title: 'ID' },
    { field: 'description', title: 'Description' },
    { field: 'month', title: 'Month' },
    { field: 'count', title: 'NCR Count' }
  ];

  get currentYearData() {
    return this.ncrData[this.skip]?.data || [];
  }

  get currentYear() {
    return this.ncrData[this.skip]?.year || '';
  }

  get months() {
    return this.currentYearData.map(d => d.month);
  }

  get currentYearDataCounts() {
    return this.currentYearData.map(d => d.count);
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  onBarClick(e: any) {
    const categoryIndex = e.categoryIndex;
    this.selectedMonth = this.months[categoryIndex];
    this.selectedCount = this.currentYearDataCounts[categoryIndex];
    // Mock data for grid
    this.gridData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      description: `NCR for ${this.selectedMonth} #${i + 1}`,
      month: this.selectedMonth,
      count: this.selectedCount
    }));
    this.showGrid = true;
  }

  closeGrid() {
    this.showGrid = false;
  }
 clearFilter(){

 }
  public close(component: string): void {
    this.dialogOpened = false;
  }

  public open(component: string): void {
    this.dialogOpened = true;
  }

  public action(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.dialogOpened = false;
  }
  onFilter(value: string): void {}
}
