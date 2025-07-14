import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartsModule,
  Series,
  ValueAxis,
} from '@progress/kendo-angular-charts';
import { PagerModule, PageChangeEvent } from '@progress/kendo-angular-pager';
import { SharedUiIepGridComponent } from '@shared-ui/iep-grid';
import { ApiService } from '@shared-service/data-service';
import {
  KENDO_DROPDOWNLIST,
  KENDO_MULTISELECT,
} from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import {
  KENDO_TEXTBOX,
  CheckBoxComponent,
} from '@progress/kendo-angular-inputs';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
@Component({
  selector: 'copilot-iep-nx-ecn',
  standalone: true,
  imports: [
    CommonModule,
    ChartsModule,
    PagerModule,
    SharedUiIepGridComponent,
    KENDO_DROPDOWNLIST,
    KENDO_MULTISELECT,
    KENDO_TEXTBOX,
    KENDO_BUTTON,
    FormsModule,
  ],
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
  functionsOptions = ['Individual', 'Project', 'Office'];
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
  public openECN = '400';
  public closedECN = '200';
  public openDropdown = false;
  public closedDropdown = false;
  public selectedOpen: string[] = ['Without As Build', 'With As Built'];
  public selectedClosed: string[] = [];
    public data!: { "yearMonth": any[]; "Less20": any[]; "Less40": any[]; "Grt40": any[]; "AgingP95": any[]; };
  pagedECNData: any[] = [];
  groupedData: { categories: string[]; series: any[] } = {
    categories: [],
    series: [],
  };
  constructor() {}

  public isBarChartData = false;
  public pageSize = 1;
  public skip = 0;

  public crossingValues: number[] = [0, 10, 10, 10];
 currentYearIndex = 0;
 
  years: any[] = [];
  monthsPerYear = 12;
 
  currentYearMonths: string[] = [];
  stackedSeries: any[] = [];
  agingP95ForCurrentYear: any[] = [];
  public valueAxes: ValueAxis[] = [
    {
      title: { text: 'Without As Built Count' },
      min: 0,
      max: 500,
      majorUnit: 100,
    },
    {
      name: 'Aging p95',
      min: 0,
      max: 3500,
      majorUnit: 1000,
      title: { text: 'Aging p95 counts' },
      axisCrossingValue: 10,
    },
  ];

  public categories: string[] = [];
  ngOnInit() {
    this.dataService.getECNChartData().subscribe((data: any) => {
      this.data = data.activities;
       this.years = Array.from(
      new Set(this.data.yearMonth.map(m => m.split('-')[0]))
    ).reverse();
 
    this.prepareChartData();
     
      // Initialize gridView with the full data set
      this.gridView = process(this.gridView, {
        sort: this.sort,
      }).data;
    });
    this.dataService.getCurrentProjects().subscribe((data: any) => {
      this.selectedProjects.set(data);
    });
   
  }

 

 onPageChange(e: { skip: number }) {
    this.currentYearIndex = e.skip;
    this.prepareChartData();
  }
 
  prepareChartData() {
    const year = this.years[this.currentYearIndex];
    const yearMonth = this.data.yearMonth;
  
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
 this.categories = monthNames.map((m) => `${year}-${m}`);
    const indicesForYear = yearMonth
      .map((ym, i) => ym.startsWith(year) ? i : -1)
      .filter(i => i !== -1);
 
    this.currentYearMonths = indicesForYear.map(i =>
      yearMonth[i].split('-')[1]
    ).reverse(); // For left to right from Jan to Dec
 
    const seriesNames = ['Less20', 'Less40', 'Grt40'] as const;
    type SeriesKey = typeof seriesNames[number];
 
    this.stackedSeries = seriesNames.map(seriesName => ({
      name: seriesName,
      data: indicesForYear.map(i =>
        Number((this.data as Record<SeriesKey, any[]>)[seriesName][i]) || 0
      ).reverse()
    }));
 
    this.agingP95ForCurrentYear = indicesForYear.map(i =>
      this.data.AgingP95[i] !== null ? Number(this.data.AgingP95[i]) : null
    ).reverse();
      this.isBarChartData = true;
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

  public sort: SortDescriptor[] = [];

  public onFilter(value: string): void {
    const inputValue = value.toLowerCase();
   
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
  showGridOrTable() {
    this.isGridExpanded = !this.isGridExpanded;
    if (this.selectedViewAs == 'Tabular View') {
      this.showGrid = false;
    } else {
      this.showGrid = true;
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  showopen() {
    this.openDropdown = !this.openDropdown;
    if (this.openDropdown) {
      this.closedDropdown = false;
    }
  }
  showclosed() {
    this.closedDropdown = !this.closedDropdown;
    if (this.closedDropdown) {
      this.openDropdown = false;
    }
  }
  
}
