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
  private dataService = inject(ApiService);
  public selectedProjects = this.dataService.selectedProjects;
  public gridView: any[] = [];
  public mapView: any[] = [];
  viewAsOptions = ['Tabular View', 'Chart View'];
  functionsOptions = ['Individual', 'Office', 'SumMarchy'];
  selectedViewAs: string = 'Chart View';
  selectedFunction: string = 'Individual';
  public showWarning = true;
  public isExpanded = true;
  public isGridExpanded = false;
  public mySelection: string[] = [];
  public dialogOpened = false;
  public searchValue: string = '';
  constructor() {
    effect(() => {
      const selectedProjects = this.dataService.getTreeData();
      if (selectedProjects && selectedProjects.length > 0) {
        const selected = selectedProjects.split(',');
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
  public years = [2020, 2021, 2022, 2023, 2024, 2025];
  public isBarChartData=false
  public pageSize = 1;
  public skip = 0;
  public ncrData = [
    // Example data for each year
    {
      year: 2020,
      data: [
        { month: 'January', count: 10 },
        { month: 'February', count: 12 },
        { month: 'March', count: 8 },
        { month: 'April', count: 15 },
        { month: 'May', count: 7 },
        { month: 'June', count: 9 },
        { month: 'July', count: 11 },
        { month: 'August', count: 13 },
        { month: 'September', count: 6 },
        { month: 'October', count: 14 },
        { month: 'November', count: 10 },
        { month: 'December', count: 12 },
      ],
    },
    {
      year: 2021,
      data: [
        { month: 'January', count: 9 },
        { month: 'February', count: 11 },
        { month: 'March', count: 7 },
        { month: 'April', count: 13 },
        { month: 'May', count: 8 },
        { month: 'June', count: 10 },
        { month: 'July', count: 12 },
        { month: 'August', count: 14 },
        { month: 'September', count: 5 },
        { month: 'October', count: 13 },
        { month: 'November', count: 9 },
        { month: 'December', count: 11 },
      ],
    },
    {
      year: 2022,
      data: [
        { month: 'January', count: 8 },
        { month: 'February', count: 10 },
        { month: 'March', count: 6 },
        { month: 'April', count: 12 },
        { month: 'May', count: 9 },
        { month: 'June', count: 11 },
        { month: 'July', count: 13 },
        { month: 'August', count: 15 },
        { month: 'September', count: 7 },
        { month: 'October', count: 12 },
        { month: 'November', count: 8 },
        { month: 'December', count: 10 },
      ],
    },
    {
      year: 2023,
      data: [
        { month: 'January', count: 11 },
        { month: 'February', count: 13 },
        { month: 'March', count: 9 },
        { month: 'April', count: 16 },
        { month: 'May', count: 10 },
        { month: 'June', count: 12 },
        { month: 'July', count: 14 },
        { month: 'August', count: 16 },
        { month: 'September', count: 8 },
        { month: 'October', count: 15 },
        { month: 'November', count: 11 },
        { month: 'December', count: 13 },
      ],
    },
    {
      year: 2024,
      data: [
        { month: 'January', count: 12 },
        { month: 'February', count: 14 },
        { month: 'March', count: 10 },
        { month: 'April', count: 17 },
        { month: 'May', count: 11 },
        { month: 'June', count: 13 },
        { month: 'July', count: 15 },
        { month: 'August', count: 17 },
        { month: 'September', count: 9 },
        { month: 'October', count: 16 },
        { month: 'November', count: 12 },
        { month: 'December', count: 14 },
      ],
    },
    {
      year: 2025,
      data: [
        { month: 'January', count: 13 },
        { month: 'February', count: 15 },
        { month: 'March', count: 11 },
        { month: 'April', count: 18 },
        { month: 'May', count: 12 },
        { month: 'June', count: 14 },
        { month: 'July', count: 16 },
        { month: 'August', count: 18 },
        { month: 'September', count: 10 },
        { month: 'October', count: 17 },
        { month: 'November', count: 13 },
        { month: 'December', count: 15 },
      ],
    },
  ];

  public showGrid = false;
  public selectedMonth = '';
  public selectedYear =2024;
  public selectedCount = 0;
  public gridData: any[] = [];
  public gridColumns = [
    { field: 'id', title: 'ID' },
    { field: 'description', title: 'Description' },
    { field: 'month', title: 'Month' },
    { field: 'count', title: 'NCR Count' },
  ];

  get currentYearData() {
    return this.ncrData[this.skip]?.data || [];
  }

  get currentYear() {
    return this.ncrData[this.skip]?.year || '';
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
    this.selectedMonth = categoryIndex;
    this.selectedCount = this.currentYearDataCounts[categoryIndex];
    // Mock data for grid
    this.gridData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      description: `NCR for ${this.selectedMonth} #${i + 1}`,
      month: this.selectedMonth,
      count: this.selectedCount,
    }));
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
  public ngOnInit(): void {
    this.dataService.getNCRData().subscribe((data) => {
      this.data = data || [];
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
}
