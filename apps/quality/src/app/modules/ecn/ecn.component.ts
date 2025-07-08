import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule, Series, ValueAxis } from '@progress/kendo-angular-charts';
import { PagerModule, PageChangeEvent } from '@progress/kendo-angular-pager';
import { SharedUiIepGridComponent } from '@shared-ui/iep-grid';
import { ApiService } from '@shared-service/data-service';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
@Component({
  selector: 'copilot-iep-nx-ecn',
  standalone: true,
  imports: [  CommonModule,
    ChartsModule,
    PagerModule,
    SharedUiIepGridComponent,
    KENDO_DROPDOWNLIST,
    KENDO_TEXTBOX,
    KENDO_BUTTON,
    FormsModule,],
  templateUrl: './ecn.component.html',
  styleUrl: './ecn.component.scss',
})
export class EcnComponent {
   @ViewChild('tooltipDir')
  public tooltipDir!: TooltipDirective;
  public dataService = inject(ApiService);
  public selectedProjects = this.dataService.selectedProjects;
  public gridView: any[] = [];
  public mapView: any[] = [];
  viewAsOptions = ['ECN', 'ECR'];
  functionsOptions = ['Individual','Project', 'Office' ];
  selectedViewAs: string = 'ECN';
  selectedFunction: string = 'Individual';
  public showWarning = true;
  public isExpanded = true;
  public isGridExpanded = false;
  public mySelection: string[] = [];
  public dialogOpened = false;
  public searchValue: string = '';
  public selectedMonth: string = '';
  public selectedCount: number = 0;
  public showGrid: boolean = false;
  public gridData: any[] = [];
  public collapsed = false;
  public openECN='400';
  public closedECN='200';
  public openDropdown=false;
  public closedDropdown=false;
  constructor() {

  }
 
  public isBarChartData=false
  public pageSize = 1;
  public skip = 0;
  
   public crossingValues: number[] = [0, 0, 10, 10];
 public series: Series[] = [
    {
      type: "column",
      data: [20, 40, 45, 30, 50],
      stack: true,
      name: "0-20",
      color: "#057320",
    },
   
     {
      type: "column",
      data: [20, 100, 50, 70, 40],
      stack: true,
      name: "21-40",
      color: "#ead44a",
    },
     {
      type: "column",
      data: [200, 30, 60, 100, 140],
      stack: true,
      name: ">40",
      color: "#eb3105",
    },
    {
      type: "line",
      data: [300, 38, 400, 32, 42],
      name: "Aging p95",
      color: "#0c47b6",
      axis: "Aging p95",
    },
   
  ];

  public valueAxes: ValueAxis[] = [
    {
      title: { text: "Without As Built Count" },
      min: 0,
      max: 500,
       majorUnit: 100,
    },
    {
      name: "Aging p95",
        min: 0,
      max: 2500,
       majorUnit: 500,
      title: { text: "Aging p95 counts" },
      color: "#ec5e0a",
      axisCrossingValue: 0,
    },

  ];

  public categories: string[] = ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "Jun 2025"];
  ngOnInit() {
    this.dataService.getGridData().subscribe((data: any) => {
      this.data = data;
      this.gridView = this.data;
      this.gridData = this.data;
      // Initialize gridView with the full data set
      this.gridView = process(this.gridView, {
        sort: this.sort,
      }).data;
    });
    this.dataService.getCurrentProjects().subscribe((data: any) => {
      this.selectedProjects.set(data);
    });
  
  }



  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }


  closeGrid() {
    this.showGrid = false;
  }
  clearFilter() {}
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
  public data: any[] = [];
  public sort: SortDescriptor[] = [];
 
  public onFilter(value: string): void {
    const inputValue = value.toLowerCase();
    this.gridView = this.data.map((el: any) =>
      Object.fromEntries(
        Object.entries(el).map(([key, value]) => [
          key.replace(/\s+/g, ''),
          value,
        ])
      )
    );
    if (!inputValue) {
      return;
    }
    // Dynamically filter across all string fields
    this.gridView = this.gridView.filter((row: any) =>
      Object.values(row).some(
        (val) => val && val.toString().toLowerCase().includes(inputValue)
      )
    );
  }

  public onSortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = orderBy(this.gridView, this.sort);
  }
  public showTooltip(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (
      (element.nodeName === 'TD' || element.className === 'k-column-title') &&
      element.nodeName !== 'kendo-checkbox'
    ) {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }
  public clearFilters(): void {
    this.searchValue = '';
    this.onFilter('');
    // Add more filter reset logic here if needed
  }
  showGridOrTable(){
    this.isGridExpanded = !this.isGridExpanded;
    if (this.selectedViewAs == 'Tabular View') {
      this.showGrid=false;
    } else {
      this.showGrid=true;
    }
  }
  
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    // Emit an event or use a shared service to notify the parent (ISPO) to expand/collapse
    const event = new CustomEvent('filterProjectsCollapse', { detail: { collapsed: this.collapsed } });
    window.dispatchEvent(event);
  }

showopen(){
  this.openDropdown = !this.openDropdown;
  if(this.openDropdown){
    this.closedDropdown=false;
  } 
}
showclosed(){
  this.closedDropdown = !this.closedDropdown;
  if(this.closedDropdown){
    this.openDropdown=false;
  }
}
}
