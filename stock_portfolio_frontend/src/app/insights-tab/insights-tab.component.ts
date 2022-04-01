import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-insights-tab',
  templateUrl: './insights-tab.component.html',
  styleUrls: ['./insights-tab.component.css']
})
export class InsightsTabComponent implements OnInit {
  reddit: any;
  twitter: any;

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
    this.reddit = this.rs.sentiment.reddit ? this.rs.sentiment.reddit[0] : undefined;
    this.twitter = this.rs.sentiment.twitter ? this.rs.sentiment.twitter[0] : undefined;
  }

}
