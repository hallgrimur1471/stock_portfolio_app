import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
        quantity: 70.01,
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
    return of(this.portfolio);
  }
}
