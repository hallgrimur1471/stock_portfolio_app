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
  peers: any = Object();
  historical: any = Object();
  historical_str: string = '';
  news: any = Object();
  topNews: any = Object();
  hasDescription: boolean = false;
  hasQuote: boolean = false;
  hasPeers: boolean = false;
  hasHistoricalData: boolean = false;
  hasNews: boolean = false;
  hasResults: boolean = false;

  constructor(private api: ApiService) { }

  fetchResultsFor(ticker: string) {
    this.resetResults();

    this.api.getDescription(ticker)
      .subscribe(description => {
        this.description = description;
        this.description_str = JSON.stringify(description);
        this.hasDescription = true;
        this.updateHasResults();
      });

    this.api.getQuote(ticker)
      .subscribe(quote => {
        this.quote = quote;
        this.quote.th = this.epoch2date(this.quote.t);
        this.quote_str = JSON.stringify(quote);
        this.hasQuote = true;
        this.updateHasResults();
      });

    this.api.getPeers(ticker)
      .subscribe(peers => {
        this.peers = peers;
        this.hasPeers = true;
        this.updateHasResults();
      });

    let resolution: number = 5;
    let to: any = Math.floor(Date.now() / 1000);
    let from: any = new Date();
    from.setHours(from.getHours() - 6);
    from = Math.floor(from.getTime() / 1000);
    //from = Math.floor(new Date(1631022248).getTime());
    //to = Math.floor(new Date(1631627048).getTime());
    this.api.getHistoricalData(ticker, resolution, from, to)
      .subscribe(historical => {
        this.historical = historical;
        this.historical.tc = this.getTC(this.historical.t, this.historical.c)
        this.historical_str = JSON.stringify(historical);
        this.hasHistoricalData = true;
        this.updateHasResults();
      });

    this.api.getNews(ticker, from, to)
      .subscribe(news => {
        this.news = news;
        this.topNews = this.extractTopNews(this.news);
        this.hasNews = true;
        this.updateHasResults();
      })
  }

  private extractTopNews(news: any[]) {
    let topNews: any[] = [];

    let i = 0;
    let populatedNews = 0;
    while (populatedNews < 5) {
      if (i >= news.length) {
        break;
      }

      let x = news[i];
      if (x.image && x.headline && x.datetime && x.url) {
        topNews.push(x);
        populatedNews += 1;
      }
      i += 1;
    }

    return topNews;
  }

  private getTC(t: any, c: any) {
    return t.map((t: any, i: any) => { return [t * 1000, c[i]] });
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
    this.hasHistoricalData = true; // TODO: set to false
    this.hasNews = false;
    this.hasResults = false;
  }

  private updateHasResults() {
    this.hasResults = this.hasDescription && this.hasQuote && this.hasPeers && this.hasHistoricalData && this.hasNews;
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
