import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormGroupArgs, KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import {KENDO_DATEINPUTS} from "@progress/kendo-angular-dateinputs";
import { KENDO_EXPANSIONPANEL } from '@progress/kendo-angular-layout';
@Component({
  selector: 'iep-grid',
  standalone: true,
  imports: [CommonModule, KENDO_GRID, KENDO_INPUTS,KENDO_EXPANSIONPANEL, FormsModule,KENDO_DIALOG,KENDO_DATEINPUTS],
  templateUrl: './shared-ui-iep-grid.component.html',
  styleUrl: './shared-ui-iep-grid.component.scss',
})
export class SharedUiIepGridComponent {
  @Input() searchValue: string = '';
  @Input() data: any[] = [];
  @Input() columns: { field: string; title: string; filterValue?: string; selectedValues?: any[] }[] =
    [];
  @Input() pageable = true;
  @Input() enablescrolling= false;
  @Input() selectable = false;
  @Input() acknowledgeable = false;
  @Input() source: string = '';
  @Output() selectionChange = new EventEmitter<any[]>();
  public gridView: any[] = [];
  public pageSize = 10;
  public skip = 0;
  public sort: any[] = [];
  public selectedKeys: any[] = [];
  public resourceDialogOpen = false;
  public editDialogOpen = false;
  public resourceDialogData: any = null;
  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.dataItem;

    this.formGroup = this.formBuilder.group({
      PROMISE_DATE: item.PROMISE_DATE});
      return this.formGroup;
    }
  ngOnInit() {
    this.loadGrid();
    console.log(this.source)
  }

  ngOnChanges() {
    this.loadGrid();
  }

  loadGrid() {
    this.gridView = this.data.slice(this.skip, this.skip + this.pageSize);
  }

  pageChange(event: any): void {
    this.skip = event.skip;
    this.loadGrid();
  }

  sortChange(sort: any[]): void {
    this.sort = sort;
    // Sorting logic can be added here if needed
  }

  onColumnFilterChange(col: any, value: string, filterService: any) {
    col.filterValue = value;
    // Filter data based on all column filters and selected values
    let filtered = this.data;
    this.columns.forEach((c) => {
      if (c.filterValue && c.filterValue.trim() !== '') {
        filtered = filtered.filter((row) => {
          const cellValue = (row[c.field] ?? '').toString().toLowerCase();
          const filterVal = (c.filterValue ?? '').toString().toLowerCase();
          return cellValue.includes(filterVal);
        });
      }
      if (c.selectedValues && c.selectedValues.length > 0) {
        filtered = filtered.filter((row) => (c.selectedValues ?? []).includes(row[c.field]));
      }
    });
    this.gridView = filtered.slice(this.skip, this.skip + this.pageSize);
  }

  getFilteredColumnValues(col: any): any[] {
    // Get all unique values for the column (no filtering by search box)
    return this.data
      .map((row) => row[col.field])
      .filter((v, i, arr) => arr.indexOf(v) === i && v != null && v !== '');
  }

  onColumnValueCheck(col: any, value: any, e:Event) {
    if (!col.selectedValues) col.selectedValues = [];
    const checked= (e.target as HTMLInputElement).checked;
    if (checked) {
      col.selectedValues.push(value);
    } else {
      col.selectedValues = col.selectedValues.filter((v: any) => v !== value);
    }
    this.onColumnFilterChange(col, col.filterValue, null);
  }

  onSelectionChange(event: any) {
    this.selectedKeys.push(event.selectedRows.map((r: any) => r.dataItem));
    this.selectionChange.emit(this.selectedKeys);
  }

  public loadMore(): void {
    const next = this.gridView.length;
    this.gridView = [...this.gridView, ...this.data.slice(next, next + 50)];
  }

  openResourceDialog(value: any) {
    // Find the first row in data where the column value matches
    this.resourceDialogData = value;
    this.resourceDialogOpen = true;
  }

  closeResourceDialog() {
    this.resourceDialogOpen = false;
    this.resourceDialogData = null;
  }
  acknowledge() {
    if (this.acknowledgeable && this.selectedKeys.length > 0) {
      // Logic to acknowledge selected items
      console.log('Acknowledging:', this.selectedKeys);
      // Reset selection after acknowledging
      this.selectionChange.emit(this.selectedKeys);
    } else {
      console.warn('No items selected for acknowledgment');
    }
  }
   public clickedRowItem:any;

    onCellClick(e:any) {
      this.clickedRowItem = e.dataItem;
    }
  onColumnDblClick(col: any) {
    // Handle double-click on column header
    console.log('Column double-clicked:', this.clickedRowItem);
    this.resourceDialogData = this.clickedRowItem;
    this.editDialogOpen = true;
    // You can implement any specific logic here, like opening a dialog or editing the column
  }
  closeEditDialog() {
    this.editDialogOpen = false;
    this.resourceDialogData = null;
  }
}
