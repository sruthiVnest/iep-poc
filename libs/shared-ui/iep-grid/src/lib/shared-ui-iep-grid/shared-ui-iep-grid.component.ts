import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'iep-grid',
  standalone: true,
    imports: [CommonModule, KENDO_GRID, KENDO_INPUTS, FormsModule],
  templateUrl: './shared-ui-iep-grid.component.html',
  styleUrl: './shared-ui-iep-grid.component.scss',
})
export class SharedUiIepGridComponent {
   @Input() data: any[] = [];
  @Input() columns: { field: string; title: string; filterValue?: string }[] = [];

  public gridView: any[] = [];
  public pageSize = 10;
  public skip = 0;
  public sort: any[] = [];

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
    // Filter data based on all column filters
    let filtered = this.data;
    this.columns.forEach(c => {
      if (c.filterValue && c.filterValue.trim() !== '') {
        filtered = filtered.filter(row => {
          const cellValue = (row[c.field] ?? '').toString().toLowerCase();
          const filterVal = (c.filterValue ?? '').toString().toLowerCase();
          return cellValue.includes(filterVal);
        });
      }
    });
    this.gridView = filtered.slice(this.skip, this.skip + this.pageSize);
  }
}
