import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.css']
})
export class ArticleModalComponent implements OnInit {
  @Input() source: string = "";
  @Input() publishedDateUnix: number = 0;
  publishedDate: string = "";
  @Input() title: string = "";
  titleEncoded: string = "";
  @Input() description: string = "";
  @Input() url: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.publishedDate = this.epochTimeHumanReadable(this.publishedDateUnix);
    this.titleEncoded = encodeURIComponent(this.title);
  }

  private epochTimeHumanReadable(unixEpoch: number): string {
    let date = new Date(unixEpoch * 1000);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  public fbshareCurrentPage(url: string) {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) + "&t=" + "someTitle", '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;
  }
}
