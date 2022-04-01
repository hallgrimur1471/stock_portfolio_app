import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public rs: SearchResultsService,
  ) {
  }

  ngOnInit(): void {
    this.updateBasedOnRoute();
  }

  private updateBasedOnRoute(): void {
    const ticker: string = this.route.snapshot.paramMap.get('ticker')?.toUpperCase() || '';

    if (ticker === 'HOME' || ticker === '') {
      return;
    }

    this.rs.fetchResultsFor(ticker);
  }
}
