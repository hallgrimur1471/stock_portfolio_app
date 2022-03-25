import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.css']
})
export class ArticleModalComponent implements OnInit {
  @Input() name: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
