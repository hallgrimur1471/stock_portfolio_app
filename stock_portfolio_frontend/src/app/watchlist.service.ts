import { Injectable } from '@angular/core';

import { WatchlistEntry } from './watchlist';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  watchlist!: WatchlistEntry[];

  constructor(private api: ApiService) {
    this.initializeService();
  }

  initializeService(): void {
    this.watchlist = this.getWatchlistFromLocalStorage();
  }

  updateWatchlist(): void {
    for (let i = 0; i < this.watchlist.length; i++) {
      const entry = this.watchlist[i];
      this.api.getQuote(entry.ticker)
        .subscribe(quote => {
          const newEntry: WatchlistEntry = {
            ticker: entry.ticker,
            name: entry.name,
            currentPrice: quote.c,
            changeInPrice: quote.d,
            changeInPricePercentage: quote.dp
          }
          this.watchlist[i] = newEntry;
        });
    }
  }

  getWatchlistEntry(ticker: string): WatchlistEntry | undefined {
    for (let i = 0; i < this.watchlist.length; i++) {
      if (ticker === this.watchlist[i].ticker) {
        return this.watchlist[i];
      }
    }
    return undefined;
  }

  addToWatchlist(entry: WatchlistEntry) {
    this.watchlist.push(entry);
    this.saveWatchlist();
  }

  removeFromWatchlistByIndex(index: number) {
    this.watchlist.splice(index, 1);
    this.saveWatchlist();
  }

  removeFromWatchlist(ticker: string) {
    let entryIndex: number | undefined;
    for (let i = 0; i < this.watchlist.length; i++) {
      if (ticker === this.watchlist[i].ticker) {
        entryIndex = i;
      }
    }
    if (entryIndex === undefined) {
      return;
    }
    this.removeFromWatchlistByIndex(entryIndex);
  }

  private getWatchlistFromLocalStorage(): WatchlistEntry[] {
    const wl_str = localStorage.getItem("watchlist");
    return wl_str ? JSON.parse(wl_str) : [];
    // [
    //   {
    //     ticker: "GOOGL",
    //     name: "Alphabet Inc",
    //     currentPrice: 2627.75,
    //     changeInPrice: 75.99,
    //     changeInPricePercentage: 2.9791234234
    //   },
    //   {
    //     ticker: "MSFT",
    //     name: "Microsoft Corp",
    //     currentPrice: 290.42,
    //     changeInPrice: -10.15,
    //     changeInPricePercentage: -3.621234234
    //   }
    // ];
  }

  private saveWatchlist(): void {
    localStorage.setItem("watchlist", JSON.stringify(this.watchlist));
  }
}
