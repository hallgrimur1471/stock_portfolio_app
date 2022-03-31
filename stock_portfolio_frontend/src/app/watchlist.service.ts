import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Watchlist } from './watchlist';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  watchlist: Watchlist[] = [
    {
      ticker: "GOOGL",
      name: "Alphabet Inc",
      currentPrice: 2627.75,
      changeInPrice: 75.99,
      changeInPricePercentage: 2.9791234234
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corp",
      currentPrice: 290.42,
      changeInPrice: -10.15,
      changeInPricePercentage: -3.621234234
    }
  ]

  constructor() { }

  public getWatchlist(): Observable<Watchlist[]> {
    return of(this.watchlist);
  }
}
