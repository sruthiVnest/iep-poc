import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartsModule,
  CollectionService,
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
import { KENDO_LABEL } from '@progress/kendo-angular-label';

@Component({
  selector: 'iep-nx-ecr',
  standalone: true,
  imports: [  CommonModule,
    ChartsModule,
    PagerModule,
    SharedUiIepGridComponent,
    KENDO_DROPDOWNLIST,
    KENDO_MULTISELECT,
    KENDO_TEXTBOX,
    KENDO_BUTTON,
    KENDO_LABEL,
    FormsModule,],
    providers: [CollectionService],
  templateUrl: './ecr.component.html',
  styleUrl: './ecr.component.scss',
})
export class EcrComponent {
  @Output() ecnSummaryChange = new EventEmitter<string>();
  @ViewChild('tooltipDir')
  public tooltipDir!: TooltipDirective;
  public dataService = inject(ApiService);
  public gridView: any[] = [];
  public mapView: any[] = [];
  viewAsOptions = ['ECN', 'ECR'];
  functionsOptions = ['Individual', 'Project', 'Office'];
  public defective: string = 'No';
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
  public data: any;

  // Paging and chart data
  public activitiesByYear: { [year: string]: any[] } = {};
  public years: string[] = [];
  public currentPage = 1;
  public pageSize = 1;
  public categories: string[] = [];
  public ecrdata: number[] = [];

  constructor() {}

  ngOnInit() {
    this.dataService.getECRData().subscribe((data: any) => {
      const activities = (data.ecrchart.data.activities || []).map((a: any) => ({
        ...a,
        Count: Number(a.Count)
      }));
      this.activitiesByYear = activities.reduce((acc: any, curr: any) => {
        const year = curr.yearMonth.split('-')[0];
        acc[year] = acc[year] || [];
        acc[year].push(curr);
        return acc;
      }, {});
      console.log(this.activitiesByYear);
      this.years = Object.keys(this.activitiesByYear).sort();
      this.setChartData();
    });
  }

  setChartData() {
    const year = this.years[this.currentPage - 1];
    const yearData = this.activitiesByYear[year] || [];
    this.categories = yearData.map(a => a.yearMonth).reverse();
    this.ecrdata = yearData.map(a => a.Count).reverse();
  }

  onPageChange(e: PageChangeEvent) {
    this.currentPage = e.skip + 1;
    this.setChartData();
  }


//Grid

 onBarClick(e: any) {
  
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
   //   this.selectedMonth = this.months[categoryIndex];
      monthNumber = monthNames.indexOf(this.selectedMonth) + 1;
    }
   // this.selectedCount = this.currentYearDataCounts[categoryIndex];
    const inputParam = { month: monthNumber, year: 2014 };
    // Mock data for grid
    this.dataService.getECRData().subscribe((data) => {
      this.gridView=[];
      const gridData=data.ecrtable.data.activities || [];
      if(gridData.length > 0){
       this.gridView = gridData.map((el: any) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key.replace(/\s+/g, ''),
            value,
          ])
        )
      );
    
    this.mapView = Object.keys(gridData[0]).map((key) => ({
          field: key.replace(/\s+/g, ''),
          title: key.replace('_', ' ').toUpperCase(),
        }));
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
    window.dispatchEvent(
      new CustomEvent('filterProjectsCollapse', {
        detail: { collapsed: this.collapsed },
      })
    );
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
 onSummaryChange(event: any) {
 const selectedValue = event;
  this.ecnSummaryChange.emit(selectedValue);
 }

}
