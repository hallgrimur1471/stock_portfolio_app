import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { MaterialExampleModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BuyModalComponent } from './buy-modal/buy-modal.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    BuyModalComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatAutocompleteModule,
    FormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
