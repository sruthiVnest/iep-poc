import { Component, inject } from '@angular/core';
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
export class DovsbuyComponent {
  public data: any = [];
 private dataService = inject(ApiService);
   public gridView: any[] = [];
  public mapView: any[] = [];
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
}
