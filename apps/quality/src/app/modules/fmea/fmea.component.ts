import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from '@progress/kendo-angular-charts';

@Component({
  selector: 'iep-nx-fmea',
  standalone: true,
  imports: [CommonModule,ChartsModule],
  templateUrl: './fmea.component.html',
  styleUrl: './fmea.component.scss',
})
export class FmeaComponent {}
