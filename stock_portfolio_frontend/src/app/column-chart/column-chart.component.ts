import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

// Highstock
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
HC_stock(Highcharts);

// HC Modules
import HC_data from 'highcharts/modules/data';
import HC_dragPanes from 'highcharts/modules/drag-panes';
HC_data(Highcharts);
HC_dragPanes(Highcharts);

// HC Indicators
import IndicatorsCore from "highcharts/indicators/indicators";
import IndicatorZigzag from "highcharts/indicators/zigzag";
import HC_Volume from 'highcharts/indicators/volume-by-price';
IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);
HC_Volume(Highcharts);

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {};
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { };
  updateFlag: boolean = false;
  oneToOneFlag: boolean = false;
  runOutsideAngular: boolean = false;

  strongBuys: number[] = [];
  buys: number[] = [];
  holds: number[] = [];
  strongSells: number[] = [];
  sells: number[] = [];
  months: string[] = [];

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
    let trends = this.rs.trends;
    this.strongBuys = trends.map((trend: any) => trend.strongBuy);
    this.buys = trends.map((trend: any) => trend.buy);
    this.holds = trends.map((trend: any) => trend.hold);
    this.strongSells = trends.map((trend: any) => trend.strongSell);
    this.sells = trends.map((trend: any) => trend.sell);
    this.months = trends.map((trend: any) => trend.period.slice(0, -3));

    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Recommendation Trends'
      },
      xAxis: {
        categories: this.months
      },
      yAxis: {
        min: 0,
        title: {
          text: '#Analysis',
          align: 'high',
        },
        stackLabels: {
          enabled: true,
          borderWidth: 0,
          style: {
            fontWeight: 'bold',
            color: (
              Highcharts.defaultOptions.title?.style &&
              Highcharts.defaultOptions.title.style.color
            ) || 'gray'
          },
        }
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        floating: false,
        backgroundColor:
          Highcharts.defaultOptions.legend?.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 0,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: false,
          }
        }
      },
      series: [{
        name: 'Strong Buy',
        type: 'column',
        data: this.strongBuys,
        color: '#176f37'
      }, {
        name: 'Buy',
        type: 'column',
        data: this.buys,
        color: '#1db954'
      }, {
        name: 'Hold',
        type: 'column',
        data: this.holds,
        color: '#b98b1d'
      }, {
        name: 'Sell',
        type: 'column',
        data: this.sells,
        color: '#f45b5b'
      }, {
        name: 'Strong Sell',
        type: 'column',
        data: this.strongSells,
        color: '#813131'
      }],
      credits: {
        enabled: false
      }
    }
  }
}