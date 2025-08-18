import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from '@progress/kendo-angular-charts';

@Component({
  selector: 'iep-nx-coq',
  standalone: true,
  imports: [CommonModule,ChartsModule],
  templateUrl: './coq.component.html',
  styleUrl: './coq.component.scss',
})
export class CoqComponent {}
