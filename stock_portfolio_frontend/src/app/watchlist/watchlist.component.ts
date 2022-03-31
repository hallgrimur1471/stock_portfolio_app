import { Component, OnInit } from '@angular/core';

import { Watchlist } from '../watchlist';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: Watchlist[] = [];

  constructor(private ws: WatchlistService) { }

  ngOnInit(): void {
    this.getWatchlist();
  }

  removeFromWatchlist(index: number) {
    this.watchlist.splice(index, 1);
  }

  showResults(index: number) {
    console.log(`Showing search results for ${index}...`);
    // TODO: implement
  }

  private getWatchlist(): void {
    this.ws.getWatchlist().
      subscribe(watchlist => this.watchlist = watchlist);
  }
}
