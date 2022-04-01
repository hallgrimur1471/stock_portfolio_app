import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Portfolio } from './portfolio';
import { Share } from './share';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  portfolio!: Portfolio;

  constructor() {
    this.initializeService();
  }

  initializeService(): void {
    this.getPortfolio()
      .subscribe(p => this.portfolio = p);
  }

  getPortfolio(): Observable<Portfolio> {
    return this.getPortfolioFromLocalStorage().pipe(
      map(
        p => this.updatePortfolio(p)
      ),
      tap(
        p => this.portfolio = p
      )
    )
  }

  getOwnedQuantity(ticker: string): number {
    let s = this.getShare(ticker);
    return s ? s.quantity : 0;
  }

  buyShares(ticker: string, buyQuantity: number, name?: string, currentPrice?: number): boolean {
    let s: Share | undefined = this.getShare(ticker);
    if (!s) {
      if (!name || !currentPrice) {
        return false;
      }
      s = this.createShare(ticker, name, currentPrice);
      this.portfolio.shares.push(s);
    }

    let buyCost = buyQuantity * s.currentPrice;
    if (this.portfolio.money < buyCost) {
      return false;
    }

    this.portfolio.money -= buyCost;
    s.quantity += buyQuantity;
    s.totalCost += buyCost;
    s.avgCost = s.totalCost / s.quantity;
    s.change = s.currentPrice - s.avgCost;
    s.marketValue = s.currentPrice * s.quantity;

    this.savePortfolio();

    return true;
  }

  sellShares(ticker: string, sellQuantity: number): boolean {
    let s: Share | undefined = this.getShare(ticker);
    if (!s) {
      return false;
    }

    if (s.quantity < sellQuantity) {
      return false;
    }

    let sellValue = sellQuantity * s.currentPrice;
    this.portfolio.money += sellValue;
    s.quantity -= sellQuantity;
    s.totalCost = s.totalCost - (sellQuantity * s.avgCost);
    s.avgCost = s.totalCost / s.quantity;
    s.change = s.currentPrice - s.avgCost;
    s.marketValue = s.currentPrice * s.quantity;

    if (s.quantity === 0) {
      this.portfolio.shares.splice(this.portfolio.shares.indexOf(s), 1);
    }

    this.savePortfolio();

    return true;
  }

  private getShare(ticker: string): Share | undefined {
    const shares = this.portfolio.shares;
    for (let i = 0; i < shares.length; i++) {
      if (ticker === shares[i].ticker) {
        return shares[i];
      }
    }
    return undefined;
  }

  private createShare(ticker: string, name: string, currentPrice: number): Share {
    return {
      ticker: ticker,
      name: name,
      quantity: 0,
      avgCost: 0,
      totalCost: 0,
      change: currentPrice - 0,
      currentPrice: currentPrice,
      marketValue: 0
    }
  }

  private getPortfolioFromLocalStorage(): Observable<Portfolio> {
    let portfolio_str: string | null = localStorage.getItem("portfolio")
    let portfolio: Portfolio = portfolio_str ? JSON.parse(portfolio_str) : this.getInitialPortfolio();

    this.portfolio = portfolio;
    return of(this.portfolio);
  }

  private savePortfolio(): void {
    console.log("Saving portfolio..")
    localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
  }

  private getInitialPortfolio(): Portfolio {
    // return {
    //   money: 25000,
    //   shares: this.getMockShares()
    // }
    return {
      money: 25000,
      shares: []
    }
  }

  private getMockShares(): Share[] {
    return [
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

  private updatePortfolio(p: Portfolio): Portfolio {
    p.shares.map(
      (s) => {
        //s.currentPrice = 100000;
        s;
      }
    )
    return p;
  }
}
