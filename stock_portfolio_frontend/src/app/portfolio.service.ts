import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Portfolio } from './portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  portfolio: Portfolio = {
    money: 8896.71,
    shares: [
      {
        ticker: 'VMW',
        name: 'VMware Inc',
        quantity: 70.00,
        avgCost: 117.49,
        totalCost: 8224.30,
        change: 0.23,
        currentPrice: 117.72,
        marketValue: 8240.40
      },
      {
        ticker: 'GOOGL',
        name: 'Alphabet Inc',
        quantity: 3,
        avgCost: 2626.33,
        totalCost: 7878.99,
        change: -2.64,
        currentPrice: 2628.97,
        marketValue: 7886.91,
      }
    ]
  }

  constructor() { }

  public getPortfolio(): Observable<Portfolio> {
    return this.getPortfolioFromLocalStorage().pipe(
      map(
        p => this.updatePortfolio(p)
      ),
      tap(
        p => this.portfolio = p
      )
    )
  }

  private getPortfolioFromLocalStorage(): Observable<Portfolio> {
    // TODO: implement
    return of(this.portfolio);
  }

  private updatePortfolio(p: Portfolio): Portfolio {
    p.shares.map(
      (s) => {
        s.currentPrice = 100000;
      }
    )
    return p;
  }

  public buyShares(ticker: string, name: string, quantity: number, currentPrice: number): boolean {
    // let s = getShare(ticker);
    // let buyCost = quantity * s.currentPrice;
    // if (this.money >= buyCost) {
    //
    // }

    return true;
  }
}
