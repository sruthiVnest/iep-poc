import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@shared-service/data-service';
import { KENDO_CHARTS } from '@progress/kendo-angular-charts';

@Component({
  selector: 'copilot-iep-nx-otrdr',
  standalone: true,
  imports: [CommonModule, KENDO_CHARTS],
  templateUrl: './otrdr.component.html',
  styleUrl: './otrdr.component.scss',
})
export class OtrdrComponent {
  public dataService = inject(ApiService);
  public pieData: any[] = [];
  public drilldownData: any;
  public apiapprover: any;
  public currentOTRDR: any;
  public actionItem: any;
    public secondLevelActionIOwner: any;
  public thirdLevelActionOwner: any;
  public secondLevelAIOwner: any;
  public thirdLevelAIOwner: any;
  public breadcrumb: string[] = [];
   public breadcrumbai: string[] = [];
  chartTitle = 'All Business Unit';

  currentData = {
    categories: [],
    series: [{ name: '', data: [] }],
  };
    approverData = {
    categories: [],
    series: [{ name: '', data: [] }],
  };
  public ngOnInit(): void {
    this.dataService.getOtrDrData().subscribe((data) => {
      if (data.length > 0) {
        data.forEach((item: any) => {
          if (item['DR_AI_Status']) {
            this.pieData = item.DR_AI_Status;
          } else if (item['AIApprover_Team_Chart']) {
            this.apiapprover = item.AIApprover_Team_Chart.activities;
          } else if (item['Action_Owner_Team_Chart']) {
            this.drilldownData = item.Action_Owner_Team_Chart.activities;
          } else if (item['CurrentOTRDRPendingWith']) {
            this.currentOTRDR = item.CurrentOTRDRPendingWith.activities;
          } else if (item['ActionItemByDR']) {
            this.actionItem = item.ActionItemByDR.activities;
          } else if (item['actionowner_secondlevel']) {
            this.secondLevelActionIOwner = item.actionowner_secondlevel.activities;
          } else if (item['actionowner_thirdlevel']) {
            this.thirdLevelActionOwner = item.actionowner_thirdlevel.activities;
          }
          else if (item['approver_secondlevel']) {
            this.secondLevelAIOwner = item.approver_secondlevel.activities;
          } else if (item['approver_thirdlevel']) {
            this.thirdLevelAIOwner = item.approver_thirdlevel.activities;
          }
        });
        this.setTopLevelData();
      }
      
    });
  }
  setTopLevelData() {
    this.chartTitle = 'All Business Unit';
    this.currentData = {
      categories: this.drilldownData.teams,
      series: [
        {
          name: 'Due',
          data: this.drilldownData.due.map((item: string) => Number(item)),
        },
        {
          name: 'Backlog',
          data: this.drilldownData.backlog.map((item: string) => Number(item)),
        },
        {
          name: 'Complete',
          data: this.drilldownData.complete.map((item: string) => Number(item)),
        },
      ],
    };
  this.approverData = {
      categories: this.apiapprover.teams,
      series: [
        {
          name: 'Teams',
          data: this.apiapprover.teams,
        },
        {
          name: 'count',
          data: this.apiapprover.count.map((item: string) => Number(item)),
        },
      
      ],
    };
    console.log(this.approverData);
  }

  onSeriesClick(e: any,type:string): void {
    if(type==='actionowner'){
    const clickedCategory = e.category;
    if (this.breadcrumb.length < 3) this.breadcrumb.push(clickedCategory);
    const secondLevel = this.secondLevelActionIOwner;
    if (this.breadcrumb.length === 1) {
      // Second level

      if (secondLevel) {
        this.chartTitle = `Sub Business Unit - ${clickedCategory}`;
        this.currentData = {
          categories: secondLevel.teams,
          series: [
            {
              name: 'Due',
              data: secondLevel.due.map((item: string) => Number(item)),
            },
            {
              name: 'Backlog',
              data: secondLevel.backlog.map((item: string) => Number(item)),
            },
            {
              name: 'Complete',
              data: secondLevel.complete.map((item: string) => Number(item)),
            },
          ],
        };
      }
    } else if (this.breadcrumb.length === 2) {
      // Third level
      const [team, subTeam] = this.breadcrumb;
      const thirdLevel = this.thirdLevelActionOwner;
      if (thirdLevel) {
        this.chartTitle = `Detail - ${subTeam}`;
        this.currentData = {
          categories: thirdLevel.teams,
          series: [
            {
              name: 'Due',
              data: thirdLevel.due.map((item: string) => Number(item)),
            },
            {
              name: 'Backlog',
              data: thirdLevel.backlog.map((item: string) => Number(item)),
            },
            {
              name: 'Complete',
              data: thirdLevel.complete.map((item: string) => Number(item)),
            },
          ],
        };
      }
    }
  }
  else{
  const clickedCategory = e.category;
    if (this.breadcrumbai.length < 3) this.breadcrumbai.push(clickedCategory);
    const secondLevel = this.secondLevelAIOwner;
    if (this.breadcrumbai.length === 1) {
      // Second level

      if (secondLevel) {
        this.chartTitle = `Sub Business Unit - ${clickedCategory}`;
        this.approverData = {
          categories: secondLevel.teams,
          series: [
            {
              name: 'Teams',
              data: secondLevel.teams
            },
            {
              name: 'Count',
              data: secondLevel.count.map((item: string) => Number(item)),
            },
          ],
        };
      }
    } else if (this.breadcrumbai.length === 2) {
      // Third level
      const [team, subTeam] = this.breadcrumbai;
      const thirdLevel = this.thirdLevelAIOwner;
      if (thirdLevel) {
        this.chartTitle = `Detail - ${subTeam}`;
        this.approverData = {
          categories: thirdLevel.teams,
          series: [
            {
              name: 'Due',
              data: thirdLevel.due.map((item: string) => Number(item)),
            },
            {
              name: 'Backlog',
              data: thirdLevel.backlog.map((item: string) => Number(item)),
            },
            {
              name: 'Complete',
              data: thirdLevel.complete.map((item: string) => Number(item)),
            },
          ],
        };
      }
    }
  
  }
  }

  goBack() {
    this.breadcrumb.pop();
    if (this.breadcrumb.length === 0) {
      this.setTopLevelData();
    } else if (this.breadcrumb.length === 1) {
      this.onSeriesClick({ category: this.breadcrumb[0] },'actionowner');
    } else if (this.breadcrumb.length === 2) {
      const second = this.breadcrumb[1];
      this.onSeriesClick({ category: second },'actionowner');
    }
  }
}
