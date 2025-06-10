import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import {
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from "@progress/kendo-angular-grid";
import { process, SortDescriptor, orderBy } from "@progress/kendo-data-query";

import { SVGIcon, filePdfIcon, fileExcelIcon, caretAltExpandIcon, exeIcon } from '@progress/kendo-svg-icons';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { DataService } from '../../services/data.service';
import { KENDO_TOOLTIP,TooltipDirective } from '@progress/kendo-angular-tooltip';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { KENDO_MULTISELECT } from '@progress/kendo-angular-dropdowns';
import {map} from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { FilterProjectsComponent } from '../../shared/filter-projects/filter-projects.component';
import { ProjectSelectionService } from '../../services/project-selection.service';
import { IepGridComponent } from '@shared-ui/iep-grid';
import { effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterActivitiesComponent } from '../../pages/filter-activities/filter-activities.component';

@Component({
  selector: 'copilot-iep-nx-ispo',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    KENDO_GRID,
    KENDO_INPUTS,
    KENDO_GRID_PDF_EXPORT,
    KENDO_GRID_EXCEL_EXPORT,
    KENDO_SVGICON,
    KENDO_MULTISELECT,
    KENDO_DIALOG,
    KENDO_TOOLTIP,
    IepGridComponent,
    FormsModule, // <-- Add FormsModule for ngModel support
    FilterActivitiesComponent // <-- Add FilterActivitiesComponent for use in template
  ],
  templateUrl: './ispo.component.html',
  styleUrls: ['./ispo.component.scss'],
})
export class IspoComponent {
    @ViewChild('tooltipDir')
  public tooltipDir!: TooltipDirective;
  
@ViewChild('filterActivitiesRef') filterActivitiesRef!: FilterActivitiesComponent;

  public gridView: any[] = [];
  public mapView: any[] = [];
  public elementsMeta: any[] = [{
    columnTitle: 'projectID',
    columnField: 'data'
  },
  {
    columnTitle: 'activityID',
    columnField: 'Activity'
  }];
  public data:any=[];
  public isExpanded = false;
  public isGridExpanded = false;
  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public expandIcon: SVGIcon = exeIcon;
  public caretAltExpandIcon: SVGIcon = caretAltExpandIcon;
  public dialogOpened = false;
  public sort: SortDescriptor[] = [];
  public showWarning = true;
  public searchValue: string = '';

 private dataService= inject(DataService);
  public filterProjects = inject(FilterProjectsComponent, { optional: true });
  private projectSelectionService = inject(ProjectSelectionService);
  public selectedProjects = this.projectSelectionService.selectedProjects;

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
  constructor(){
     // Use effect to react to signal changes
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
  public ngOnInit(): void {
    this.dataService.getGridData().subscribe((data)=>{
      this.data=data[0]?.data?.activities || [];
         this.gridView = this.data.map((el:any) =>
      Object.fromEntries(Object.entries(el).map(([key, value]) => ([
        key.replace(/\s+/g, ""),
        value
      ])))
    );
if(this.data){
    this.mapView = Object.keys(this.data[0]).map(key => ({
      field: key.replace(/\s+/g, ""),
      title: key.replace('_', ' ').toUpperCase()
    }))
  }
    });

   
  }

  public onFilter(value: string): void {
    const inputValue = value.toLowerCase();
    this.gridView = this.data.map((el: any) =>
      Object.fromEntries(Object.entries(el).map(([key, value]) => ([
        key.replace(/\s+/g, ""),
        value
      ])))
    );
    if (!inputValue) {
      return;
    }
    // Dynamically filter across all string fields
    this.gridView = this.gridView.filter((row: any) =>
      Object.values(row).some(val =>
        val && val.toString().toLowerCase().includes(inputValue)
      )
    );
  }

  public onSortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridView = orderBy(this.gridView, this.sort);
  }
  public showTooltip(event: MouseEvent): void {
     const element = event.target as HTMLElement;
    if ((element.nodeName === "TD" || element.className === "k-column-title") && element.nodeName !== "kendo-checkbox") {
     
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

