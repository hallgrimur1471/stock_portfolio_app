import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

// Highstock
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
HC_stock(Highcharts);

// HC Modules
import HC_data from 'highcharts/modules/data';
import HC_dragPanes from 'highcharts/modules/drag-panes';
import HC_exporting from 'highcharts/modules/exporting';
HC_data(Highcharts);
HC_dragPanes(Highcharts);
HC_exporting(Highcharts);

// HC Indicators
import IndicatorsCore from "highcharts/indicators/indicators";
import IndicatorZigzag from "highcharts/indicators/zigzag";
import HC_Volume from 'highcharts/indicators/volume-by-price';
IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);
HC_Volume(Highcharts);

@Component({
  selector: 'app-spline-chart',
  templateUrl: './spline-chart.component.html',
  styleUrls: ['./spline-chart.component.css']
})
export class SplineChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: any = {};
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { }
  updateFlag: boolean = false;
  oneToOneFlag: boolean = false;
  runOutsideAngular: boolean = false;

  actuals: any[][] = [];
  estimates: any[][] = [];
  xAxis: string[] = [];

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
    let earnings = this.rs.earnings;
    this.xAxis = earnings.map((x: any) => x.period + "<br>" + "Surprise: " + x.surprise);
    this.actuals = earnings.map((x: any, i: number) => [this.xAxis[i], x.actual]);
    this.estimates = earnings.map((x: any, i: number) => [this.xAxis[i], x.estimate]);

    this.chartOptions = {
      chart: {
        type: 'spline',
        inverted: false
      },
      title: {
        text: 'Historical EPS Surprises'
      },
      xAxis: {
        categories: this.xAxis
      },
      yAxis: {
        title: {
          text: 'Quarterly EPS'
        },
        labels: {
          format: '{value}'
        },
        lineWidth: 2
      },
      legend: {
        enabled: true
      },
      tooltip: {
        crosshairs: false,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            enable: false
          }
        }
      },
      series: [
        {
          name: 'Actual',
          data: this.actuals,
        }, {
          name: 'Estimate',
          data: this.estimates,
        }
      ],
      exporting: {
        buttons: {
          contextButton: {
            enabled: false,
          }
        }
      },
      credits: {
        enabled: false
      }
    }
  }
}
