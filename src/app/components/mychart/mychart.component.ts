import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styles: []
})
export class MychartComponent implements OnInit {

  // public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: number[] = [350, 450, 100];
  // public doughnutChartType: string = 'doughnut';
  // public leyenda: string = 'La leyenda';

  @Input() doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() doughnutChartData: number[] = [350, 450, 100];
  @Input() doughnutChartType: string = 'doughnut';
  @Input() leyenda: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
