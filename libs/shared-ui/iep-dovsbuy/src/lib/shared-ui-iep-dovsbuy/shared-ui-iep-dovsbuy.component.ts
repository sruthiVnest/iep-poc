import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiIepGridComponent } from '@shared-ui/iep-grid';
import { ApiService } from '@shared-service/data-service';
@Component({
  selector: 'iep-nx-dovsbuy',
  standalone: true,
  imports: [CommonModule, SharedUiIepGridComponent],
  templateUrl: './shared-ui-iep-dovsbuy.component.html',
  styleUrl: './shared-ui-iep-dovsbuy.component.scss',
})
export class SharedUiIepDovsbuyComponent {
  private _searchValue: string = '';
  @Input() set searchValue(value: string) {
    this._searchValue = value;
    this.filterGrid();
  }
  get searchValue(): string {
    return this._searchValue;
  }
  
  @Input() source: string ='';
  public data: any = [];
  private dataService = inject(ApiService);
  public gridView: any[] = [];
  public mapView: any[] = [];
  private allGridData: any[] = [];
  public ngOnInit(): void {
    if (this.source === 'ECN/ECR') {
      this.dataService.getECNdovsbuyData().subscribe((data:any) => {
        this.data = data.data?.Item || [];
  this.allGridData = this.data.map((el: any) =>
          Object.fromEntries(
            Object.entries(el).map(([key, value]) => [
              key.replace(/\s+/g, ''),
              value,
            ])
          )
        );
        this.gridView = [...this.allGridData];
        if (this.data) {
          this.mapView = Object.keys(this.data[0]).map((key) => ({
            field: key.replace(/\s+/g, ''),
            title: key.replace('_', ' ').toUpperCase(),
          }));
        }
      });
    } else {
    this.dataService.getGridData().subscribe((data) => {
      this.data = data.data?.activities || [];
  this.allGridData = this.data.map((el: any) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key.replace(/\s+/g, ''),
            value,
          ])
        )
      );
      this.gridView = [...this.allGridData];
      if (this.data) {
        this.mapView = Object.keys(this.data[0]).map((key) => ({
          field: key.replace(/\s+/g, ''),
          title: key.replace('_', ' ').toUpperCase(),
        }));
      }
    });
  }
  }

  filterGrid(): void {
    if (!this.allGridData) return;
    const value = (this._searchValue || '').toLowerCase();
    if (!value) {
      this.gridView = [...this.allGridData];
    } else {
      this.gridView = this.allGridData.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(value)
        )
      );
    }
  }
}
