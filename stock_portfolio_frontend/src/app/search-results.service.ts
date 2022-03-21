import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  description!: Observable<object>;

  constructor(private api: ApiService) { }

  fetchResultsFor(ticker: string) {
    this.description = this.api.getDescription(ticker);
  }
}
