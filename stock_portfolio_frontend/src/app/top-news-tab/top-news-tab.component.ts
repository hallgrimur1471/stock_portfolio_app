import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ArticleModalComponent } from '../article-modal/article-modal.component'

import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-top-news-tab',
  templateUrl: './top-news-tab.component.html',
  styleUrls: ['./top-news-tab.component.css']
})
export class TopNewsTabComponent implements OnInit {

  constructor(public rs: SearchResultsService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openArticle(index: number): void {
    console.log(`Opening article ${index} ...`);

    const modalRef = this.modalService.open(ArticleModalComponent);
    modalRef.componentInstance.name = "World :)";
  }
}
