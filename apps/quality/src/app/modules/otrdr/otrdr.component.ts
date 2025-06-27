import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@shared-service/data-service';
import { KENDO_CHARTS } from '@progress/kendo-angular-charts';

@Component({
  selector: 'copilot-iep-nx-otrdr',
  standalone: true,
  imports: [CommonModule,KENDO_CHARTS],
  templateUrl: './otrdr.component.html',
  styleUrl: './otrdr.component.scss',
})

export class OtrdrComponent {
    public dataService = inject(ApiService);
    public pieData: any[] = [];
    public drilldownData: any;
    public apiapprover:any;
    public currentOTRDR:any;
    public actionItem:any;
     public ngOnInit(): void {
    this.dataService.getOtrDrData().subscribe((data) => {
      if(data.length>0){
        data.forEach((item: any) => {
          if(item["DR_AI_Status"]){
            console.log('pieData', this.pieData);
            this.pieData = item.DR_AI_Status;
            console.log('pieData', this.pieData);
          }
          else if(item["AIApprover_Team_Chart"]){
            this.apiapprover = item.AIApprover_Team_Chart.activities;
          }
          else if(item["Action_Owner_Team_Chart"]){
               this.drilldownData = item.Action_Owner_Team_Chart.activities;
          }
          else if(item["CurrentOTRDRPendingWith"]){
            this.currentOTRDR = item.CurrentOTRDRPendingWith.activities;
          }
            else if(item["ActionItemByDR"]){
            this.actionItem = item.ActionItemByDR.activities;
          }
        });
      }
      console.log('otrdr data', data);
    })
  }
}
