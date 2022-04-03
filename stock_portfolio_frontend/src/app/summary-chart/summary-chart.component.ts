import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.css']
})
export class SummaryChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'stockChart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {};
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
    const chartColor = this.rs.quote.dp > 0 ? '#198754' : '#dc3545'
    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: `<div class='text-muted'>${this.rs.description.ticker} Hourly Price Variation</div>`,
        useHTML: true
      },
      series: [{
        name: this.rs.description.ticker,
        data: this.rs.historicalSummary.tc,
        type: 'line',
        showInLegend: false,
      }],
      plotOptions: {
        series: {
          color: chartColor
        }
      },
      yAxis: {
        opposite: true,
        title: {
          text: undefined
        },
        labels: {
          align: 'left',
          x: -15,
          y: -2,
        }
      },
      navigator: {
        enabled: false
      },
      rangeSelector: {
        enabled: false
      }
    }; // required
  }
}
