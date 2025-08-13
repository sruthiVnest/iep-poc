import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';

@Component({
  selector: 'copilot-iep-nx-loading',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  progressValue = 100; // Indeterminate mode, value is ignored but required
}
