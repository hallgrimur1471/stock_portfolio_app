import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, startWith, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from '../api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  description: any = Object();
  description_str: string = "";

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions$!: Observable<any[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDescription();

    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      //map((val) => val.length < 2 ? [] : val),
      switchMap(val => {
        //return of(this.options)
        return this._filter2(val || '')
      })
      //map(value => this._filter(value)),
    );
  }

  private _filter2(val: string): Observable<any[]> {
    if (val.length < 1) {
      return of([]);
    }
    return this.apiService.getCompanies(val)
      .pipe(
        map(response => response.filter(company => {
          return (company.type == "Common Stock") &&
            (!company.symbol.includes(".")) &&
            this.startsWithIgnoreCase(company.displaySymbol, val)
        })),
        map(response => response.map(company => company.symbol))
      )
  }

  getDescription() {
    this.apiService.getDescription("TSLA")
      .subscribe(desc => {
        this.description = desc;
        this.description_str = JSON.stringify(desc);
      });
  }

  private startsWithIgnoreCase(s1: string, val: string) {
    return s1.toLowerCase().indexOf(val.toLowerCase()) === 0
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      return option.toLowerCase().includes(filterValue)
    });
  }
}
