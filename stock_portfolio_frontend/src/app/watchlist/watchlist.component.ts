import { Component, OnInit } from '@angular/core';

import { WatchlistEntry } from '../watchlist';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor(public ws: WatchlistService) { }

  ngOnInit(): void {
    this.ws.updateWatchlist();
  }

  removeFromWatchlist(index: number) {
    this.ws.removeFromWatchlistByIndex(index);
    this.ws.updateWatchlist();
  }
}
