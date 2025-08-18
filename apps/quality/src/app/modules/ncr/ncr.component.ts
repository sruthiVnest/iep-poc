import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { PagerModule, PageChangeEvent } from '@progress/kendo-angular-pager';
import { SharedUiIepGridComponent } from '@shared-ui/iep-grid';
import { ApiService } from '@shared-service/data-service';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
@Component({
  selector: 'copilot-iep-nx-ncr',
  standalone: true,
  imports: [
    CommonModule,
    ChartsModule,
    PagerModule,
    SharedUiIepGridComponent,
    KENDO_DROPDOWNLIST,
    FormsModule,
  ],
  templateUrl: './ncr.component.html',
  styleUrl: './ncr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NcrComponent {
  @ViewChild('tooltipDir')
  public tooltipDir!: TooltipDirective;
  public dataService = inject(ApiService);
  public selectedProjects :any;
  public gridView: any[] = [];
  public mapView: any[] = [];
  viewAsOptions = ['Tabular View', 'Chart View'];
  functionsOptions = ['Individual','Project', 'Office'];
  selectedViewAs: string = 'Chart View';
  selectedFunction: string = 'Individual';
  public showWarning = true;
  public isExpanded = false;
  public isGridExpanded = false;
  public mySelection: string[] = [];
  public dialogOpened = false;
  public searchValue: string = '';
  public selectedMonth: string = '';
  public selectedCount: number = 0;
  public showGrid: boolean = false;
  public gridData: any[] = [];
  public collapsed = false;
  constructor() {
    effect(() => {
      const selectedProjects = this.dataService.getTreeData();
      if (selectedProjects && selectedProjects.length > 0) {
        const selected = selectedProjects.split(',');
        this.selectedProjects = selected;
        // Only filter if there are selected projects
        this.gridView = this.data.filter((row: any) => {
          const projectId = row['id'] || row['ProjectID'] || row['projectId'] || row['ProjectId'];
          return selected.includes(projectId?.toString());
        });
      } else {
        this.gridView = this.data;
      }
    });
  }
 
  public isBarChartData=false
  public pageSize = 1;
  public skip = 0;
  public ncrData: { year: number; month: string; count: number }[] =[];
  public loading=true;
  public pagedNcrData: { year: number; data: { month: string; count: number }[] }[] = [];

  ngOnInit() {
    
    this.dataService.getNCRData().subscribe((data) => {
      this.data = data.tabularData || [];
      this.ncrData = data.chartData.monthlyNCR || [];
       this.pagedNcrData = this.groupNcrDataByYear(this.ncrData);
      this.loading = false;
      this.gridView = this.data.map((el: any) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key.replace(/\s+/g, ''),
            value,
          ])
        )
      );
      if (this.data) {
        this.mapView = Object.keys(this.data[0]).map((key) => ({
          field: key.replace(/\s+/g, ''),
          title: key.replace('_', ' ').toUpperCase(),
        }));
      }
    });
  }

  groupNcrDataByYear(data: { year: number; month: string; count: number }[]) {
    const grouped: { [year: number]: { month: string; count: number }[] } = {};
    data.forEach((item) => {
      if (!grouped[item.year]) grouped[item.year] = [];
      grouped[item.year].push({ month: item.month, count: item.count });
    });
    return Object.keys(grouped)
      .sort((a, b) => +b - +a)
      .map((year) => ({ year: +year, data: grouped[+year] }));
  }

  get currentYearData() {
    return this.pagedNcrData[this.skip]?.data || [];
  }

  get currentYear() {
    return this.pagedNcrData[this.skip]?.year || '';
  }

  get months() {
    return this.currentYearData.map((d) => d.month);
  }

  get currentYearDataCounts() {
    return this.currentYearData.map((d) => d.count);
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  onBarClick(e: any) {
    this.isBarChartData = true;
    const categoryIndex = e.category;
    // Convert month name to month number (1-12)
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let monthNumber = null;
    if (typeof categoryIndex === 'string') {
      monthNumber = monthNames.indexOf(categoryIndex) + 1;
      this.selectedMonth = categoryIndex;
    } else if (typeof categoryIndex === 'number') {
      this.selectedMonth = this.months[categoryIndex];
      monthNumber = monthNames.indexOf(this.selectedMonth) + 1;
    }
    this.selectedCount = this.currentYearDataCounts[categoryIndex];
    const inputParam = { month: monthNumber, year: this.currentYear };
    // Mock data for grid
    this.dataService.getNCRDataBymonth(inputParam).subscribe((data) => {
      this.gridView=[];
      console.log("data is ==>",data);
      this.data=data;
      if(this.data.length > 0){
       this.gridView = this.data.map((el: any) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key.replace(/\s+/g, ''),
            value,
          ])
        )
      );
    
      if (this.data) {
        this.mapView = Object.keys(this.data[0]).map((key) => ({
          field: key.replace(/\s+/g, ''),
          title: key.replace('_', ' ').toUpperCase(),
        }));
      }
    }
    });
    this.showGrid = true;
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
  }

}
