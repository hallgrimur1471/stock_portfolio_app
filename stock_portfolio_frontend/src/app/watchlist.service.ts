import { Injectable, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { WatchlistEntry } from './watchlist';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  watchlist!: WatchlistEntry[];

  constructor() {
    this.initializeService();
  }

  initializeService(): void {
    console.log("ws ngoninit...")
    this.getWatchlist()
      .subscribe(wl => this.watchlist = wl);
  }

  getWatchlist(): Observable<WatchlistEntry[]> {
    const wl = this.watchlist || this.getWatchlistFromLocalStorage();
    return of(wl);
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

    this.watchlist.splice(entryIndex, 1);
    this.saveWatchlist();
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
