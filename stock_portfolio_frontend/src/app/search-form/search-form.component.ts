import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, map, switchMap, tap, startWith, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { SearchResultsService } from '../search-results.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  control = new FormControl();
  autocompleteOptions$!: Observable<any[]>;
  subscription$!: Observable<any[]>;
  loading = false;

  constructor(
    private apiService: ApiService,
    public rs: SearchResultsService
  ) { }

  ngOnInit(): void {

    this.subscription$ = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        return this.getOptions(val || '')
      })
    );
    this.autocompleteOptions$ = this.subscription$;

    this.search("TSLA") // TODO: remove
  }

  handleEnterKeypress(ticker: string): void {
    console.log("handling enter...")
    this.loading = false;
    // this.autocompleteOptions$ = this.subscription$;
    // this.search(ticker);
  }

  search(ticker: string): void {
    console.log(`searching for ${ticker}...`)
    this.rs.fetchResultsFor(ticker);
  }

  clearSearchResults(): void {
    // TODO: implement
  }

  private getOptions(val: string): Observable<any[]> {
    if (val.length < 1) {
      this.loading = false;
      return of([]);
    }
    this.loading = true;
    return this.apiService.getCompanies(val)
      .pipe(
        map(response => response.filter(company => {
          return (company.type == "Common Stock") &&
            (!company.symbol.includes(".")) &&
            this.startsWithIgnoreCase(company.displaySymbol, val)
        })),
        tap(() => this.loading = false),
        map(response => response.map(company => company.symbol)),
      )
  }

  private startsWithIgnoreCase(s1: string, val: string) {
    return s1.toLowerCase().indexOf(val.toLowerCase()) === 0
  }
}
