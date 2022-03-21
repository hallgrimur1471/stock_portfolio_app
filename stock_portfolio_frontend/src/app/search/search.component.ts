import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  filteredOptions$!: Observable<string[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDescription();

    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  getDescription() {
    this.apiService.getDescription("TSLA")
      .subscribe(desc => {
        this.description = desc;
        this.description_str = JSON.stringify(desc);
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
