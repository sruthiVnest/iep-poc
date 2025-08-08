import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { SharedUiIepGridComponent } from "@shared-ui/iep-grid";
import { ApiService } from '@shared-service/data-service';

@Component({
  selector: 'ecr-risk',
  standalone: true,
  imports: [CommonModule, TabStripModule, SharedUiIepGridComponent],
  templateUrl: './ecr-risk.component.html',
  styleUrl: './ecr-risk.component.scss',
})
export class EcrRiskComponent {
     public dataService = inject(ApiService);
   public data:any[] = [];
  public gridView: any[] = [];
  public mapView: any[] = [];
  ngOnInit() {
   this.dataService.getECRRiskData().subscribe((data: any) => {
      this.data = data.data.activities || [];
      this.gridView=[];
      const gridData=data.data.activities || [];
      if(gridData.length > 0){
       this.gridView = gridData.map((el: any) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key.replace(/\s+/g, ''),
            value,
          ])
        )
      );
    
      if (this.data) {
        this.mapView = Object.keys(gridData[0]).map((key) => ({
          field: key.replace(/\s+/g, ''),
          title: key.replace('_', ' ').toUpperCase(),
        }));
      }
    }
  
    });
  }
}
