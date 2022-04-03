import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { BuyModalComponent } from '../buy-modal/buy-modal.component'

import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  // portfolio!: Portfolio;

  buyAlertMessage: string = '';
  sellAlertMessage: string = '';
  private buyAlertSubject = new Subject<string>();
  private sellAlertSubject = new Subject<string>();

  @ViewChild('buyAlert', { static: false }) buyAlert!: NgbAlert;
  @ViewChild('sellAlert', { static: false }) sellAlert!: NgbAlert;

  constructor(public ps: PortfolioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.ps.updatePortfolio();

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
  }

  openBuyModal(index: number): void {
    const modal = this.modalService.open(BuyModalComponent);
    const share = this.ps.portfolio.shares[index];
    modal.componentInstance.ticker = share.ticker;
    modal.componentInstance.currentPrice = share.currentPrice;
    modal.componentInstance.ownedQuantity = share.quantity;
    modal.componentInstance.moneyInWallet = this.ps.portfolio.money;
    modal.componentInstance.isBuy = true;
    modal.result.then((result) => {
      this.ps.buyShares(share.ticker, modal.componentInstance.quantity);
      this.openBuyAlert(share.ticker);
      this.ps.updatePortfolio();
    }, (reason) => {
      this.ps.updatePortfolio();
    });
  }

  openSellModal(index: number): void {
    const modal = this.modalService.open(BuyModalComponent);
    const share = this.ps.portfolio.shares[index];
    modal.componentInstance.ticker = share.ticker;
    modal.componentInstance.currentPrice = share.currentPrice;
    modal.componentInstance.ownedQuantity = share.quantity;
    modal.componentInstance.moneyInWallet = this.ps.portfolio.money;
    modal.componentInstance.isBuy = false;
    modal.result.then((result) => {
      this.ps.sellShares(share.ticker, modal.componentInstance.quantity);
      this.openSellAlert(share.ticker);
      this.ps.updatePortfolio();
    }, (reason) => {
      this.ps.updatePortfolio();
    });
  }

  openSellAlert(ticker: string) {
    const msg: string = `${ticker} sold successfully.`;
    this.sellAlertSubject.next(msg);
  }

  openBuyAlert(ticker: string) {
    const msg: string = `${ticker} bought successfully.`;
    this.buyAlertSubject.next(msg);
  }
}
