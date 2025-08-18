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
export class FmeaComponent {
  public paretoData = [
  { category: 'Issue A', value: 40, dot: 10 },
  { category: 'Issue B', value: 25, dot: 12 },
  { category: 'Issue C', value: 15, dot: 7 },
  { category: 'Issue D', value: 10, dot: 5 },
  { category: 'Issue E', value: 10, dot: 6 },
];
public crossingValues = [0,8]; // Adjust this value as needed
  get paretoCategories() {
    return this.paretoData.map(d => d.category);
  }
  get paretoValues() {
    return this.paretoData.map(d => d.value);
  }
  get paretoDots() {
    return this.paretoData.map(d => d.dot);
  }
  get paretoCumulative() {
    const values = this.paretoValues;
    const total = values.reduce((sum, v) => sum + v, 0);
    let cumulative = 0;
    return values.map(v => {
      cumulative += v;
      return +(cumulative / total * 100).toFixed(2);
    });
  }
}
