import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Portfolio } from './portfolio';
import { Share } from './share';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  portfolio!: Portfolio;

  constructor(private api: ApiService) {
    this.initializeService();
    this.updatePortfolio();
  }

  initializeService(): void {
    this.portfolio = this.getPortfolioFromLocalStorage();
  }

  updatePortfolio(): void {
    for (let i = 0; i < this.portfolio.shares.length; i++) {
      const share: Share = this.portfolio.shares[i];
      this.api.getQuote(share.ticker)
        .subscribe(quote => {
          const updatedShare: Share = {
            ticker: share.ticker,
            name: share.name,
            quantity: share.quantity,
            currentPrice: quote.c,
            avgCost: share.avgCost,
            totalCost: share.totalCost,
            change: quote.c - share.avgCost,
            marketValue: quote.c * share.quantity
          }
          this.portfolio.shares[i] = updatedShare;
          this.savePortfolio();
        })
    }
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

  private getPortfolioFromLocalStorage(): Portfolio {
    let portfolio_str: string | null = localStorage.getItem("portfolio")
    let portfolio: Portfolio = portfolio_str ? JSON.parse(portfolio_str) : this.getInitialPortfolio();

    return portfolio;
  }

  private savePortfolio(): void {
    localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
  }

  private getInitialPortfolio(): Portfolio {
    return {
      money: 25000,
      shares: []
    }
  }
}
