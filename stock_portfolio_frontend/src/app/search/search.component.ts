import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public rs: SearchResultsService
  ) {
  }

  ngOnInit(): void {
  }
}
