import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KENDO_TABSTRIP, KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import {
  CheckableSettings,
  CheckMode,
  KENDO_TREEVIEW,
} from '@progress/kendo-angular-treeview';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { ApiService } from '@shared-service/data-service';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_LABEL } from '@progress/kendo-angular-label';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'copilot-iep-nx-shared-office',
  standalone: true,
  imports: [ CommonModule,
    KENDO_TABSTRIP,
    KENDO_TREEVIEW,
    KENDO_INPUTS,
    KENDO_LAYOUT,
    KENDO_DROPDOWNS,
    KENDO_DIALOG,
    KENDO_BUTTON,
    KENDO_LABEL,
    CommonModule,
    FormsModule,],
  templateUrl: './shared-office.component.html',
  styleUrl: './shared-office.component.scss',
})
export class SharedOfficeComponent {
  public activeTabIndex = 0;
  public enableCheck = true;
  public checkChildren = true;
  public checkDisabledChildren = false;
  public checkParents = true;
  public checkOnClick = false;
  public uncheckCollapsedChildren = false;
  public checkMode: CheckMode = 'multiple';
  public checkedKeys: string[] = ['0'];
  public offices: any = [];
  public favouriteOffice: any = [];
  private dataService = inject(ApiService);
  public filterTerm = '';
  offices_closed: any;
  public get checkableSettings(): CheckableSettings {
    return {
      checkChildren: this.checkChildren,
      checkDisabledChildren: this.checkDisabledChildren,
      checkParents: this.checkParents,
      enabled: this.enableCheck,
      mode: this.checkMode,
      checkOnClick: this.checkOnClick,
      uncheckCollapsedChildren: this.uncheckCollapsedChildren,
    };
  }

  public children = (dataItem: any): Observable<any[]> =>
    of(dataItem.suboffice || dataItem.officeNumber);
  public hasChildren = (dataItem: any): boolean =>
    !!dataItem.suboffice || !!dataItem.officeNumber;
  public selectedOffices:string='';
  constructor() {
    this.dataService.getCurrentOffices().subscribe((data: any) => {
      this.offices = data.activeOffice || [];
       this.offices_closed = data.closedOffice || [];
      this.favouriteOffice = this.offices.filter(
        (item: any) => item.isFavourite == 'True'
      );
    });
  }
  onTabSelect(e: any) {
    console.log(e);
  }
  onNodeSelect(e: any) {
    this.selectedOffices+=","+e;
  }
  onFilterTermChange(e: any) {
    console.log(e);
  }
  addToFavourites(name: any) {
    console.log(name);
  }
}
