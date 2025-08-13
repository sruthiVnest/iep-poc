import { Component, inject } from '@angular/core';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { NcrComponent } from '../ncr/ncr.component';
import { SharedUiIepFilterContractComponent } from '@shared-ui/iep-filter-contract';
import { OtrdrComponent } from '../otrdr/otrdr.component';
import { EcnComponent } from '../ecn/ecn.component';
import { DovsbuyComponent } from '@copilot-iep-nx/shared-ui/iep-dovsbuy';
import { FormsModule } from '@angular/forms';
import { KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { SharedUiParetoChartComponent } from '@shared-ui/pareto-chart';
import { EcrRiskComponent } from '../../pages/ecr-risk/ecr-risk.component';
import { ApiService } from '@shared-service/data-service';
import { CcmComponent } from '../ccm/ccm.component';
import { NcmComponent } from '../ncm/ncm.component';
import { FmeaComponent } from '../fmea/fmea.component';
@Component({
  selector: 'quality-dashboard',
  standalone: true,
  templateUrl: './quality-dashboard.component.html',
  styleUrls: ['./quality-dashboard.component.scss'],
  imports: [
    SharedUiParetoChartComponent,
    SharedUiIepFilterContractComponent,
    EcrRiskComponent,
    TabStripModule,
    DovsbuyComponent,
    CommonModule,
    EcnComponent,
    KENDO_DIALOG,
    NcrComponent,
    OtrdrComponent,
    FormsModule,
    KENDO_TEXTBOX,
    CcmComponent,
    NcmComponent,
    FmeaComponent
  ],
})
export class QualityDashboardComponent {
  lastUpdated = '2025-06-03 10:00 AM';
  completion = 72;
  dashboard_expand = false;
  showIcon: boolean = false;
  isOffice:boolean = false;
  riskOpen = false;
  helpOpen = false;
  public doVsBuyDialogOpen = false;
  public chartOpen=false;
  public searchValue: string = '';
  public dataService = inject(ApiService);
  public content:string='';
  private overlayClickListener: any;

  ngOnInit() {
    window.addEventListener('filterProjectsCollapse', (event: any) => {
      this.dashboard_expand = event.detail.collapsed;
    });
    
  }
  public onFilter(value: string): void {
    const inputValue = value.toLowerCase();
   
    if (!inputValue) {
      return;
    }
  
  }

  openKaizenPage() {
    window.open('https://kaizen.example.com', '_blank');
  }
  onSelect(e: any) {
    if (e.title === 'ECN/ECR') {
      this.showIcon = true;
    }else {
      this.showIcon = false;
    }
  }
  openDoVsBuyDialog() {
    this.doVsBuyDialogOpen = true;0
  }

  closeDoVsBuyDialog() {
    this.doVsBuyDialogOpen = false;
  }
  summaryChange(event: any) {
    console.log('Summary changed:', event);
    // Handle the summary change event here
    if(event=="Office"){
      this.isOffice = true;
    }
  }
  openPareto() {
    this.chartOpen = true;
  }
  openRisk() {
    this.riskOpen = true;
  }
  openInfo(component: string) {
    this.helpOpen = true;
    if(component === 'riskInfo') {
      this.content = 'risk';
    }
    else if(component === 'dovsbuyinfo') {
      this.content = 'dovsbuy';
    }
  }
  ngAfterViewInit(): void {
    // Attach listener after dialog is rendered
    this.overlayClickListener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (this.riskOpen && !this.helpOpen && target.classList.contains('k-overlay')) {
        this.riskOpen = false;
      }
      else if (this.doVsBuyDialogOpen && !this.helpOpen && target.classList.contains('k-overlay')) {
        this.doVsBuyDialogOpen = false;
      }
    };
    document.addEventListener('click', this.overlayClickListener);
  }

  ngOnDestroy(): void {
    // Remove listener to prevent memory leaks
    document.removeEventListener('click', this.overlayClickListener);
  }
}
   