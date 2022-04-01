import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { BuyModalComponent } from '../buy-modal/buy-modal.component'

import { SearchResultsService } from '../search-results.service';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  isOwned: boolean = false;

  buyAlertMessage: string = '';
  sellAlertMessage: string = '';
  private buyAlertSubject = new Subject<string>();
  private sellAlertSubject = new Subject<string>();

  @ViewChild('buyAlert', { static: false }) buyAlert!: NgbAlert;
  @ViewChild('sellAlert', { static: false }) sellAlert!: NgbAlert;

  constructor(
    public rs: SearchResultsService,
    private ps: PortfolioService,
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

    const ticker = this.rs.description.ticker;
    this.isOwned = this.ps.getOwnedQuantity(ticker) > 0 ? true : false;
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
    }, (reason) => {
      console.log("Modal closed");
    });
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
