import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KENDO_GRID } from '@progress/kendo-angular-grid';

@Component({
  selector: 'iep-grid',
  standalone: true,
  imports: [CommonModule, KENDO_GRID],
  templateUrl: './iep-grid.component.html',
  styleUrls: ['./iep-grid.component.scss']
})
export class IepGridComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: { field: string; title: string }[] = [];

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
}
