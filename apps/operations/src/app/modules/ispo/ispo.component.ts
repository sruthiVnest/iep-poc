import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import {
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from '@progress/kendo-angular-grid';
import { process, SortDescriptor, orderBy } from '@progress/kendo-data-query';

import {
  SVGIcon,
  filePdfIcon,
  fileExcelIcon,
  caretAltExpandIcon,
  exeIcon,
} from '@progress/kendo-svg-icons';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { DataService } from '../../services/data.service';
import {
  KENDO_TOOLTIP,
  TooltipDirective,
} from '@progress/kendo-angular-tooltip';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { KENDO_MULTISELECT } from '@progress/kendo-angular-dropdowns';
import { HttpClientModule } from '@angular/common/http';
import { ProjectSelectionService } from '../../services/project-selection.service';
import { SharedUiIepGridComponent } from '@shared-ui/iep-grid';
import { effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterActivitiesComponent } from '../../pages/filter-activities/filter-activities.component';
import { ManageSubdivisionComponent } from '../../pages/manage-subdivision/manage-subdivision.component';
import { KENDO_POPUP } from "@progress/kendo-angular-popup";
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
    KENDO_POPUP,
    SharedUiIepGridComponent,
    FormsModule, // <-- Add FormsModule for ngModel support
    FilterActivitiesComponent, // <-- Add FilterActivitiesComponent for use in template
    ManageSubdivisionComponent,
  ],
  templateUrl: './ispo.component.html',
  styleUrls: ['./ispo.component.scss'],
})
export class IspoComponent {
  @ViewChild('tooltipDir')
  public tooltipDir!: TooltipDirective;

  @ViewChild('filterActivitiesRef')
  filterActivitiesRef!: FilterActivitiesComponent;
  filterMenuOpen = false;
  activeSubMenu: string | null = null;
  public gridView: any[] = [];
  public mapView: any[] = [];
  public collapsed = false;
  public data: any = [];
  public isExpanded = true;
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
//For popup
popupWidth=300;
windowWidth = window.innerWidth;
  public manageSubdivisionDialogOpen = false;

  private dataService = inject(DataService);
  private projectSelectionService = inject(ProjectSelectionService);
  public selectedProjects = this.projectSelectionService.selectedProjects;
public savedFIlteroptions:any;
public filterlist: any[] = [];
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
  constructor() {
    // Use effect to react to signal changes
    effect(() => {
      const selectedProjects = this.dataService.getTreeData();
      if (selectedProjects && selectedProjects.length > 0) {
        const selected = selectedProjects.split(',');
        // Only filter if there are selected projects
        this.gridView = this.data.filter((row: any) => {
          const projectId =
            row['id'] ||
            row['ProjectID'] ||
            row['projectId'] ||
            row['ProjectId'];
          return selected.includes(projectId?.toString());
        });
      } else {
        this.gridView = this.data;
      }
    });
  }
  public ngOnInit(): void {
    this.dataService.getGridData().subscribe((data) => {
      this.data = data.data?.activities || [];
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
    saveFilter() {
    // Implement save filter logic here
 
  
  }
  loadFilter(filter: any) {
    // Implement load filter logic here

    
  }
    toggleFilterMenu(event: MouseEvent) {
    event.stopPropagation();
    this.filterMenuOpen = !this.filterMenuOpen;
    if (this.filterMenuOpen) {
      document.addEventListener('click', this.closeFilterMenuOnOutsideClick);
    } else {
      document.removeEventListener('click', this.closeFilterMenuOnOutsideClick);
    }
  }

  closeFilterMenuOnOutsideClick = () => {
    this.filterMenuOpen = false;
    this.activeSubMenu = null;
    document.removeEventListener('click', this.closeFilterMenuOnOutsideClick);
  };
  settingsMenuOpen = false;

  toggleSettingsMenu(event: Event): void {
    event.stopPropagation();
    this.settingsMenuOpen = !this.settingsMenuOpen;
    if (this.settingsMenuOpen) {
      document.addEventListener('click', this.closeSettingsMenuOnOutsideClick);
    } else {
      document.removeEventListener('click', this.closeSettingsMenuOnOutsideClick);
    }
  }

  closeSettingsMenuOnOutsideClick = (event: Event) => {
    this.settingsMenuOpen = false;
    document.removeEventListener('click', this.closeSettingsMenuOnOutsideClick);
  };

  exportActivities() { /* TODO: Implement export logic */ }
  saveCustomGrid() { /* TODO: Implement save logic */ }
  loadCustomGrid() { /* TODO: Implement load logic */ }
  reassignMultipleActivities() { /* TODO: Implement reassign logic */ }
  manageSubdivision() { /* TODO: Implement manage logic */ }
  showDeletedIspoItems() { /* TODO: Implement show deleted logic */ }
  showInstructions() { /* TODO: Implement instructions logic */ }
  hasSelectedRows = false;

  reassignAllActivities() {
    // Implement logic for reassigning all activities
  }

  reassignSelectedActivities() {
    if (!this.hasSelectedRows) return;
    // Implement logic for reassigning selected activities
  }

  // Example: This method should be called by iep-grid when row selection changes
  onGridRowSelectionChange(selectedRows: any[]) {
    this.hasSelectedRows = selectedRows && selectedRows.length > 0;
  }

  public get selectedProjectsList(): string[] {
    return this.selectedProjects();
  }

  public openManageSubdivisionDialog(): void {
    this.manageSubdivisionDialogOpen = !this.manageSubdivisionDialogOpen;
  }
  public closeManageSubdivisionDialog(): void {
    this.manageSubdivisionDialogOpen = false;
  }
  
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    // Emit an event or use a shared service to notify the parent (ISPO) to expand/collapse
    const event = new CustomEvent('filterProjectsCollapse', { detail: { collapsed: this.collapsed } });
    window.dispatchEvent(event);
  }

}
