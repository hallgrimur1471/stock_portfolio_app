import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchResultsService } from '../search-results.service';

import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.css']
})
export class SummaryChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'stockChart';
  chartOptions: Highcharts.Options = {};
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { }
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;
  runOutsideAngular: boolean = false;

  timerSubscription!: Subscription;

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
    let chartColor = this.rs.quote.dp > 0 ? '#198754' : '#dc3545'
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
    };
    this.timerSubscription = timer(0, 500).pipe(
      map(() => {
        chartColor = this.rs.quote.dp > 0 ? '#198754' : '#dc3545'
        this.chartOptions.plotOptions!.series!.color = chartColor;
        this.chartOptions.series![0] =
        {
          name: this.rs.description.ticker,
          data: this.rs.historicalSummary.tc,
          type: 'line',
          showInLegend: false,
        }
        this.updateFlag = true;
      })
    ).subscribe();
  }
}
