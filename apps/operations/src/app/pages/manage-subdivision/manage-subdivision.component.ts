import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KENDO_SWITCH } from '@progress/kendo-angular-inputs';
import { KENDO_LABEL } from '@progress/kendo-angular-label';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
@Component({
  selector: 'copilot-iep-nx-manage-subdivision',
  standalone: true,
  imports: [FormsModule,KENDO_LABEL,KENDO_SWITCH,KENDO_DROPDOWNS],
  templateUrl: './manage-subdivision.component.html',
  styleUrls: ['./manage-subdivision.component.scss']
})
export class ManageSubdivisionComponent {
    flag: boolean = false;
    comments:boolean = false;
    subdivision:boolean = false;
    officeList=["Project","Individual","Office"]
}
