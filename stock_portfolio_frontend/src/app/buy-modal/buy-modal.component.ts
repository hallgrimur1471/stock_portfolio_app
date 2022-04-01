import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {
  @Input() ticker: string = "";
  @Input() currentPrice: number = 0;
  @Input() moneyInWallet: number = 0;
  @Input() isBuy: boolean = true;
  @Input() ownedQuantity: number = 0;
  quantity: number = 0;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  buySell(): void {
    this.isBuy ? this.buy() : this.sell();
  }

  buy(): void {
    console.log("Buy")
  }

  sell(): void {
    console.log("Sell")
  }
}
