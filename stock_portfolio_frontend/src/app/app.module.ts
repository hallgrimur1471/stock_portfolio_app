// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { MaterialExampleModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BuyModalComponent } from './buy-modal/buy-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ScrapyardComponent } from './scrapyard/scrapyard.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { StockTabsComponent } from './stock-tabs/stock-tabs.component';
import { SummaryTabComponent } from './summary-tab/summary-tab.component';
import { TopNewsTabComponent } from './top-news-tab/top-news-tab.component';
import { ChartsTabComponent } from './charts-tab/charts-tab.component';
import { InsightsTabComponent } from './insights-tab/insights-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    BuyModalComponent,
    NavbarComponent,
    WatchlistComponent,
    PortfolioComponent,
    ScrapyardComponent,
    StockDetailsComponent,
    SearchFormComponent,
    StockTabsComponent,
    SummaryTabComponent,
    TopNewsTabComponent,
    ChartsTabComponent,
    InsightsTabComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatButtonModule,
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
