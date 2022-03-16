import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {
  @Input() name: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
