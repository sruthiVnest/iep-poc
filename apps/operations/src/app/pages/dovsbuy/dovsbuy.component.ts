import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiIepGridComponent } from '@shared-ui/iep-grid';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'copilot-iep-nx-dovsbuy',
  standalone: true,
  imports: [CommonModule,SharedUiIepGridComponent],
  templateUrl: './dovsbuy.component.html',
  styleUrl: './dovsbuy.component.scss',
})
export class DovsbuyComponent {
public data: any = [];
 private dataService = inject(DataService);
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
