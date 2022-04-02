import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { BuyModalComponent } from '../buy-modal/buy-modal.component'

import { WatchlistEntry } from '../watchlist';

import { SearchResultsService } from '../search-results.service';
import { PortfolioService } from '../portfolio.service';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  isOwned: boolean = false;
  isWatchlisted: boolean = false;

  buyAlertMessage: string = '';
  sellAlertMessage: string = '';
  private buyAlertSubject = new Subject<string>();
  private sellAlertSubject = new Subject<string>();

  @ViewChild('buyAlert', { static: false }) buyAlert!: NgbAlert;
  @ViewChild('sellAlert', { static: false }) sellAlert!: NgbAlert;

  addWatchAlertMessage: string = '';
  removeWatchAlertMessage: string = '';
  private addWatchAlertSubject = new Subject<string>();
  private removeWatchAlertSubject = new Subject<string>();

  @ViewChild('addWatchAlert', { static: false }) addWatchAlert!: NgbAlert;
  @ViewChild('removeWatchAlert', { static: false }) removeWatchAlert!: NgbAlert;

  constructor(
    public rs: SearchResultsService,
    private ps: PortfolioService,
    private ws: WatchlistService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.buyAlertSubject.subscribe(message => this.buyAlertMessage = message);
    this.buyAlertSubject.pipe(debounceTime(5000)).subscribe(() => {
      if (this.buyAlert) {
        this.buyAlert.close();
      }
    });

    this.sellAlertSubject.subscribe(message => this.sellAlertMessage = message);
    this.sellAlertSubject.pipe(debounceTime(5000)).subscribe(() => {
      if (this.sellAlert) {
        this.sellAlert.close();
      }
    });

    this.addWatchAlertSubject.subscribe(message => this.addWatchAlertMessage = message);
    this.addWatchAlertSubject.pipe(debounceTime(5000)).subscribe(() => {
      if (this.addWatchAlert) {
        this.addWatchAlert.close();
      }
    });

    this.removeWatchAlertSubject.subscribe(message => this.removeWatchAlertMessage = message);
    this.removeWatchAlertSubject.pipe(debounceTime(5000)).subscribe(() => {
      if (this.removeWatchAlert) {
        this.removeWatchAlert.close();
      }
    });

    const ticker = this.rs.description.ticker;
    this.updateIsOwned(ticker);
    this.updateIsWatchlisted(ticker);
  }

  buyClicked(): void {
    let ticker = this.rs.description.ticker;
    let name = this.rs.description.name;
    let currentPrice = this.rs.quote.c;
    let ownedQuantity = this.ps.getOwnedQuantity(ticker);
    let moneyInWallet = this.ps.portfolio.money;

    const modal = this.modalService.open(BuyModalComponent);
    modal.componentInstance.ticker = ticker;
    modal.componentInstance.currentPrice = currentPrice;
    modal.componentInstance.ownedQuantity = ownedQuantity;
    modal.componentInstance.moneyInWallet = moneyInWallet;
    modal.componentInstance.isBuy = true;
    modal.result.then((result) => {
      this.ps.buyShares(ticker, modal.componentInstance.quantity, name, currentPrice);
      this.openBuyAlert(ticker);
      this.updateIsOwned(ticker);
    }, (reason) => {
      console.log("Modal closed");
    });
  }

  sellClicked(): void {
    let ticker = this.rs.description.ticker;
    let currentPrice = this.rs.quote.c;
    let ownedQuantity = this.ps.getOwnedQuantity(ticker);
    let moneyInWallet = this.ps.portfolio.money;

    const modal = this.modalService.open(BuyModalComponent);
    modal.componentInstance.ticker = ticker;
    modal.componentInstance.currentPrice = currentPrice;
    modal.componentInstance.ownedQuantity = ownedQuantity;
    modal.componentInstance.moneyInWallet = moneyInWallet;
    modal.componentInstance.isBuy = false;
    modal.result.then((result) => {
      this.ps.sellShares(ticker, modal.componentInstance.quantity);
      this.openSellAlert(ticker);
      this.updateIsOwned(ticker);
    }, (reason) => {
      console.log("Modal closed");
    });
  }

  watchlistClicked(): void {
    this.isWatchlisted = !this.isWatchlisted;

    if (this.isWatchlisted) {
      this.addToWatchlist();
    } else {
      this.removeFromWatchlist();
    }
  }

  private addToWatchlist(): void {
    const entry: WatchlistEntry = {
      ticker: this.rs.description.ticker,
      name: this.rs.description.name,
      currentPrice: this.rs.quote.c,
      changeInPrice: this.rs.quote.d,
      changeInPricePercentage: this.rs.quote.dp
    };
    this.ws.addToWatchlist(entry);
    this.openAddWatchAlert(this.rs.description.ticker);
  }

  private removeFromWatchlist(): void {
    const ticker = this.rs.description.ticker;
    console.log(`Removing ${ticker} from watchlist...`)
    this.ws.removeFromWatchlist(ticker);
    this.openRemoveWatchAlert(this.rs.description.ticker);
  }

  private openRemoveWatchAlert(ticker: string) {
    const msg: string = `${ticker} removed from Watchlist.`;
    this.removeWatchAlertSubject.next(msg);
  }

  private openAddWatchAlert(ticker: string) {
    const msg: string = `${ticker} added to Watchlist.`;
    this.addWatchAlertSubject.next(msg);
  }

  private updateIsOwned(ticker: string): void {
    this.isOwned = this.ps.getOwnedQuantity(ticker) > 0 ? true : false;
  }

  private updateIsWatchlisted(ticker: string): void {
    this.isWatchlisted = this.ws.getWatchlistEntry(ticker) ? true : false;
  }

  private openBuyAlert(ticker: string) {
    const msg: string = `${ticker} bought successfully.`;
    this.buyAlertSubject.next(msg);
  }

  private openSellAlert(ticker: string) {
    const msg: string = `${ticker} sold successfully.`;
    this.sellAlertSubject.next(msg);
  }
}
