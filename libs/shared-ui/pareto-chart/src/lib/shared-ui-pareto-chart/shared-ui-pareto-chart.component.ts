import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule, Series, ValueAxis } from '@progress/kendo-angular-charts';
@Component({
  selector: 'shared-ui-pareto-chart',
  standalone: true,
  imports: [CommonModule,ChartsModule],
  templateUrl: './shared-ui-pareto-chart.component.html',
  styleUrl: './shared-ui-pareto-chart.component.scss',
})
export class SharedUiParetoChartComponent {
   public series: Series[] = [
    {
      type: "column",
      data: [20, 40, 45, 30, 50],
      stack: false,
      name: "on battery",
      color: "#cc6e38",
    },
  
    {
      type: "line",
      data: [30, 38, 40, 32, 42],
      name: "mpg",
      color: "#ec5e0a",
      axis: "mpg",
    },
    {
      type: "bubble",
      data: [7.8, 6.2, 5.9, 7.4, 5.6],
      name: "l/100 km",
      color: "#4e4141",
      axis: "l100km",
    },
  ];

  public valueAxes: ValueAxis[] = [
    {
      title: { text: "miles" },
      min: 0,
      max: 100,
    },
  
    {
      name: "mpg",
      title: { text: "miles per gallon" },
      color: "#ec5e0a",
    },
    {
      name: "l100km",
      title: { text: "liters per 100km" },
      color: "#4e4141",
    },
  ];

  public categories: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Align the first two value axes to the left
  // and the last two to the right.
  //
  // Right alignment is done by specifying a
  // crossing value greater than or equal to
  // the number of categories.
  public crossingValues: number[] = [0, 0, 10, 10];
}
