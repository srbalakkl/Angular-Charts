import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import * as echarts from 'echarts';
import {MultiBarchartComponent} from "./multi-barchart/multi-barchart.component";
import {MatCard} from "@angular/material/card";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxEchartsDirective, MultiBarchartComponent,MatCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    provideEcharts()
  ]
})
export class AppComponent implements AfterViewInit{
  title = 'Angular-Charts';

  constructor() {
  }


  // data Structure for Series
  data = [
    {
      legend: 'Marketing',
      dataPoints: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      legend: 'Sales',
      dataPoints: [150, 232, 201, 154, 190, 330, 410],
    },
  ];

  // @Input() name: string;
  // @Input() data:any;
  series:any = [];
  legends:any = [];

  @ViewChild('elmt', { static: false }) elmtRef!: ElementRef;

  ngAfterViewInit() {
    let stackchart = echarts.init(
      // $(this.elm.nativeElement).find('#mGraph_sale')[0]
      this.elmtRef.nativeElement
    );

    this.data.forEach((x) => {
      this.series.push({
        name: x.legend,
        type: 'line',
        stack: 'Totsadfal Amount',
        areaStyle: { normal: {} },
        data: x.dataPoints,
      });

      this.legends.push(x.legend);
    });

    stackchart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: { backgroundColor: '#6a7985' },
        },
      },
      //    title: {
      //     left: 'center',
      //     text: 'Stack Chart',
      // },
      legend: { data: this.legends },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'sunday'
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: this.series,
    });
  }
}
