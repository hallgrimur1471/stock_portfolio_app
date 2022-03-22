import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  //description: string = "";
  description: string = '{"country":"US","currency":"USD","exchange":"NASDAQ NMS - GLOBAL MARKET","finnhubIndustry":"Automobiles","ipo":"2010-06-09","logo":"https://finnhub.io/api/logo?symbol=TSLA","marketCapitalization":935727.4,"name":"Tesla Inc","phone":"16506815000.0","shareOutstanding":1033.51,"ticker":"TSLA","weburl":"https://www.tesla.com/"}';
  //quote: string = "";
  quote: string = '{"c":935.74,"d":14.58,"dp":1.5828,"h":942.24,"l":921.75,"o":930,"pc":921.16,"t":1647961161}';
  //hasResults = false;
  hasResults = true;

  constructor(private api: ApiService) { }

  fetchResultsFor(ticker: string) {
    this.api.getDescription(ticker)
      .subscribe(description => {
        this.description = JSON.stringify(description);
        this.hasResults = true;
      })
    this.api.getQuote(ticker)
      .subscribe(quote => {
        this.quote = JSON.stringify(quote);
      })
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
