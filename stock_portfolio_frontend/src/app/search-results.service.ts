import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  description!: any;
  description_str!: string;
  quote!: any;
  quote_str!: string;
  peers!: any;
  historicalSummary!: any;
  historical_str!: string;
  historicalChartsTab!: any;
  sentiment!: any;
  news!: any;
  topNews!: any;
  trends!: any;
  earnings!: any[];
  hasDescription!: boolean;
  hasQuote!: boolean;
  hasPeers!: boolean;
  hasHistoricalSummary!: boolean;
  hasHistoricalChartsTab!: boolean;
  hasSentiment!: boolean;
  hasNews!: boolean;
  hasTrends!: boolean;
  hasEarnings!: boolean;
  hasResults!: boolean;
  success!: boolean;
  isLoading!: boolean;

  constructor(private api: ApiService) {
    this.initializeValues();
  }

  fetchResultsFor(ticker: string) {
    this.isLoading = true;
    this.resetResults();
    this.fetchDescription(ticker);
  }

  clearResults(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.description = Object();
    this.description_str = '{"country":"US","currency":"USD","exchange":"NASDAQ NMS - GLOBAL MARKET","finnhubIndustry":"Automobiles","ipo":"2010-06-09","logo":"https://finnhub.io/api/logo?symbol=TSLA","marketCapitalization":935727.4,"name":"Tesla Inc","phone":"16506815000.0","shareOutstanding":1033.51,"ticker":"TSLA","weburl":"https://www.tesla.com/"}';
    this.quote = Object();
    this.quote_str = '{"c":935.74,"d":14.58,"dp":1.5828,"h":942.24,"l":921.75,"o":930,"pc":921.16,"t":1647961161}';
    this.peers = Object();
    this.historicalSummary = Object();
    this.historical_str = '';
    this.historicalChartsTab = Object();
    this.sentiment = Object();
    this.news = Object();
    this.topNews = Object();
    this.trends = Object();
    this.earnings = [];
    this.hasDescription = false;
    this.hasQuote = false;
    this.hasPeers = false;
    this.hasHistoricalSummary = false;
    this.hasHistoricalChartsTab = false;
    this.hasSentiment = false;
    this.hasNews = false;
    this.hasTrends = false;
    this.hasEarnings = false;
    this.hasResults = false;
    this.success = true;
    this.isLoading = false;
  }

  private fetchRest(ticker: string) {
    this.fetchQuote(ticker);
    this.fetchPeers(ticker);
    this.fetchHistoricalSummary(ticker);
    this.fetchHistoricalChartsTab(ticker);
    this.fetchSocialSentiment(ticker);
    this.fetchNews(ticker);
    this.fetchTrends(ticker);
    this.fetchCompanyEarnings(ticker);
  }

  private fetchDescription(ticker: string) {
    this.api.getDescription(ticker)
      .subscribe(description => {
        if (description && description.ticker) {
          this.success = true;
          this.description = description;
          this.description_str = JSON.stringify(description);
          this.hasDescription = true;
          this.updateHasResults();
          this.fetchRest(ticker);
        } else {
          this.success = false;
          this.isLoading = false;
        }
      });
  }

  private fetchQuote(ticker: string) {
    this.api.getQuote(ticker)
      .subscribe(quote => {
        this.quote = quote;
        this.quote.th = this.epoch2date(this.quote.t);
        this.quote_str = JSON.stringify(quote);
        this.hasQuote = true;
        this.updateHasResults();
      });
  }

  private fetchPeers(ticker: string) {
    this.api.getPeers(ticker)
      .subscribe(peers => {
        this.peers = peers;
        this.hasPeers = true;
        this.updateHasResults();
      });
  }

  private fetchHistoricalSummary(ticker: string) {
    let resolution: string = '5';
    let to: any = Math.floor(Date.now() / 1000);
    let from: any = new Date();
    let hoursWindow = 6;
    from.setHours(from.getHours() - hoursWindow);
    from = Math.floor(from.getTime() / 1000);
    //from = Math.floor(new Date(1631022248).getTime());
    //to = Math.floor(new Date(1631627048).getTime());
    this.api.getHistoricalData(ticker, resolution, from, to)
      .subscribe(historical => {
        this.historicalSummary = historical;
        this.historicalSummary.tc = this.getTC(this.historicalSummary.t, this.historicalSummary.c)
        this.historical_str = JSON.stringify(historical);
        this.hasHistoricalSummary = true;
        this.updateHasResults();
      });
  }

  private fetchHistoricalChartsTab(ticker: string) {
    let resolution: string = 'D';
    let to: any = Math.floor(Date.now() / 1000);
    let from: any = new Date();
    let yearsWindow = 2;
    from.setFullYear(from.getFullYear() - yearsWindow);
    from = Math.floor(from.getTime() / 1000);
    this.api.getHistoricalData(ticker, resolution, from, to)
      .subscribe(historical => {
        this.historicalChartsTab = historical;
        this.hasHistoricalChartsTab = true;
        this.updateHasResults();
      });
  }

  private fetchSocialSentiment(ticker: string) {
    this.api.getSocialSentiment(ticker)
      .subscribe(sentiment => {
        this.sentiment = sentiment;
        this.hasSentiment = true;
        this.updateHasResults();
      });
  }

  private fetchNews(ticker: string) {
    let date: any = new Date(Date.now());
    console.log(date);
    console.log(typeof date.getMonth());

    let to_day: string = ('00' + date.getDate()).slice(-2);
    let to_month: string = ('00' + (date.getMonth() + 1)).slice(-2);
    let to_year: string = date.getFullYear();

    date.setDate(date.getDate() - 7);

    let from_day: string = ('00' + date.getDate()).slice(-2);
    let from_month: string = ('00' + (date.getMonth() + 1)).slice(-2);
    let from_year: string = date.getFullYear();

    let to = `${to_year}-${to_month}-${to_day}`;
    let from = `${from_year}-${from_month}-${from_day}`;

    this.api.getNews(ticker, from, to)
      .subscribe(news => {
        this.news = news;
        this.topNews = this.extractTopNews(this.news);
        this.hasNews = true;
        this.updateHasResults();
      });
  }

  private fetchTrends(ticker: string) {
    this.api.getTrends(ticker)
      .subscribe(trends => {
        this.trends = trends;
        this.hasTrends = true;
        this.updateHasResults();
      });
  }

  private fetchCompanyEarnings(ticker: string) {
    this.api.getEarnings(ticker)
      .subscribe(earnings => {
        this.earnings = earnings.map((x: any) => {
          x.actual = (x.actual === null) ? 0 : x.actual;
          x.estimate = (x.estimate === null) ? 0 : x.estimate;
          x.surprise = (x.surprise === null) ? 0 : x.surprise;
          x.surprisePercent = (x.surprisePercent === null) ? 0 : x.surprisePercent;
          return x;
        });
        this.hasEarnings = true;
        this.updateHasResults();
      })
  }

  private extractTopNews(news: any[]) {
    let topNews: any[] = [];

    let i = 0;
    let populatedNews = 0;
    while (populatedNews < 20) {
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
    if (!t) {
      return [];
    }
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
    this.hasHistoricalSummary = false;
    this.hasHistoricalChartsTab = false;
    this.hasSentiment = false;
    this.hasNews = false;
    this.hasEarnings = false;
    this.hasResults = false;
    this.success = true;
  }

  private updateHasResults() {
    //this.hasResults = this.hasDescription;
    this.hasResults = this.hasDescription && this.hasQuote && this.hasPeers && this.hasHistoricalSummary && this.hasHistoricalChartsTab && this.hasSentiment && this.hasNews && this.hasEarnings;
    if (this.hasResults) {
      this.isLoading = false;
    }
  }
}
