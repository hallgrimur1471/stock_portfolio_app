import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  percentChange: number = 1.1234;

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
    //this.percentChange = this.round(this.rs.quote.dp, 3);
    this.percentChange = this.rs.quote.dp.toFixed(2);
    //this.percentChange = this.rs.quote.dp;
  }

  buyClicked(): void {

  }

  private round(n: number, places: number) {
    return Math.round(n * (10 ** places) / (10 ** places));
  }
}
