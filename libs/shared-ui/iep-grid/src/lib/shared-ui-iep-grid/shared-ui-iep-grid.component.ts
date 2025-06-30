import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
@Component({
  selector: 'iep-grid',
  standalone: true,
  imports: [CommonModule, KENDO_GRID, KENDO_INPUTS, FormsModule,KENDO_DIALOG],
  templateUrl: './shared-ui-iep-grid.component.html',
  styleUrl: './shared-ui-iep-grid.component.scss',
})
export class SharedUiIepGridComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string; title: string; filterValue?: string; selectedValues?: any[] }[] =
    [];
  @Input() pageable = true;
  @Input() enablescrolling= false;
  @Input() selectable = false;
  @Output() selectionChange = new EventEmitter<any[]>();
  public gridView: any[] = [];
  public pageSize = 10;
  public skip = 0;
  public sort: any[] = [];
  public selectedKeys: any[] = [];
  public resourceDialogOpen = false;
  public resourceDialogData: any = null;

  ngOnInit() {
    this.loadGrid();
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
    this.selectedKeys = event.selectedRows.map((r: any) => r.dataItem);
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
}
