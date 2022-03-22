import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
  }

}
