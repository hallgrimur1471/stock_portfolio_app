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
  selector: 'app-charts-tab',
  templateUrl: './charts-tab.component.html',
  styleUrls: ['./charts-tab.component.css']
})
export class ChartsTabComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'stockChart';
  chartOptions: Highcharts.Options = {};
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { };
  updateFlag: boolean = false;
  oneToOneFlag: boolean = false;
  runOutsideAngular: boolean = false;

  dataGroupingUnits: any = [[
    'week',
    [1]
  ], [
    'month',
    [1, 2, 3, 4, 6]
  ]]

  ohlc: any = [];
  volume: any = [];

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
    let h = this.rs.historicalChartsTab;
    this.ohlc = this.getOhlc(h.t, h.o, h.h, h.l, h.c);
    this.volume = this.getVolume(h.t, h.v);

    this.chartOptions = {

      rangeSelector: {
        selected: 4
      },

      title: {
        text: `${this.rs.description.ticker} Historical`
      },

      subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
      },

      yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],

      tooltip: {
        split: true
      },

      plotOptions: {
        series: {
          dataGrouping: {
            units: this.dataGroupingUnits
          }
        }
      },

      series: [{
        type: 'candlestick',
        name: this.rs.description.ticker,
        id: 'mainSeries',
        zIndex: 2,
        data: this.ohlc
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: this.volume,
        yAxis: 1
      }, {
        type: 'vbp',
        linkedTo: 'mainSeries',
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      }, {
        type: 'sma',
        linkedTo: 'mainSeries',
        zIndex: 1,
        marker: {
          enabled: false
        }
      }]
    };
  }

  private getOhlc(t: any, o: any, h: any, l: any, c: any) {
    return t.map((t: any, i: any) => {
      return [t * 1000, o[i], h[i], l[i], c[i]];
    });
  }

  private getVolume(t: any, v: any) {
    return t.map((t: any, i: any) => {
      return [t * 1000, v[i]];
    })
  }
}
