import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  description: string = "";
  hasResults = false;

  constructor(private api: ApiService) { }

  fetchResultsFor(ticker: string) {
    this.api.getDescription(ticker)
      .subscribe(description => {
        this.description = JSON.stringify(description);
        this.hasResults = true;
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
