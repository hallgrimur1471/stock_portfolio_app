import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-insights-tab',
  templateUrl: './insights-tab.component.html',
  styleUrls: ['./insights-tab.component.css']
})
export class InsightsTabComponent implements OnInit {

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
  }

}
