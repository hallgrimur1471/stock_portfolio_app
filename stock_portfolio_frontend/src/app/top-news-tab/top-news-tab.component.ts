import { Component, OnInit } from '@angular/core';

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-top-news-tab',
  templateUrl: './top-news-tab.component.html',
  styleUrls: ['./top-news-tab.component.css']
})
export class TopNewsTabComponent implements OnInit {

  constructor(public rs: SearchResultsService) { }

  ngOnInit(): void {
  }

}
