import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BuyModalComponent } from '../buy-modal/buy-modal.component'

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
}, {
  type: 'warning',
  message: 'This is a warning alert',
}, {
  type: 'danger',
  message: 'This is a danger alert',
}
];

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  alerts: Alert[] = [];

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  open() {
    console.log("open clicked");
    const modalRef = this.modalService.open(BuyModalComponent);
    modalRef.componentInstance.name = "World :)";
  }

  constructor(private modalService: NgbModal) {
    this.reset();
  }

  ngOnInit(): void {
  }

}
