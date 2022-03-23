import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  description: any = Object();
  description_str: string = '{"country":"US","currency":"USD","exchange":"NASDAQ NMS - GLOBAL MARKET","finnhubIndustry":"Automobiles","ipo":"2010-06-09","logo":"https://finnhub.io/api/logo?symbol=TSLA","marketCapitalization":935727.4,"name":"Tesla Inc","phone":"16506815000.0","shareOutstanding":1033.51,"ticker":"TSLA","weburl":"https://www.tesla.com/"}';
  quote: any = Object();
  quote_str: string = '{"c":935.74,"d":14.58,"dp":1.5828,"h":942.24,"l":921.75,"o":930,"pc":921.16,"t":1647961161}';
  hasDescription: boolean = false;
  hasQuote: boolean = false;
  hasResults: boolean = false;
  //hasResults = true;

  constructor(private api: ApiService) { }

  fetchResultsFor(ticker: string) {
    this.resetResults();

    this.api.getDescription(ticker)
      .subscribe(description => {
        this.description = description;
        this.description_str = JSON.stringify(description);
        this.hasDescription = true;
        this.updateHasResults();
      })
    this.api.getQuote(ticker)
      .subscribe(quote => {
        this.quote = quote;
        this.quote.th = this.epoch2date(this.quote.t);
        this.quote_str = JSON.stringify(quote);
        this.hasQuote = true;
        this.updateHasResults();
      })
  }

  private epoch2date(unix_epoch: number) {
    let date = new Date(unix_epoch * 1000);

    let year = date.getFullYear();
    let month = ('00' + date.getMonth()).slice(-2);
    let day = ('00' + date.getDate()).slice(-2);

    let hour = ('00' + date.getHours()).slice(-2);
    let minute = ('00' + date.getMinutes()).slice(-2);
    let second = ('00' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  private resetResults() {
    this.hasDescription = false;
    this.hasQuote = false;
    this.hasResults = false;
  }

  private updateHasResults() {
    this.hasResults = this.hasDescription && this.hasQuote;
  }

  // getDescription() {
  //   return this.description
  // }
  // getDescription() {
  //   this.apiService.getDescription("TSLA")
  //     .subscribe(desc => {
  //       this.description = desc;
  //       this.description_str = JSON.stringify(desc);
  //     });
  // }
}
