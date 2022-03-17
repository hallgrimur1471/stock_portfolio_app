import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScrapyardComponent } from './scrapyard/scrapyard.component';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'scrapyard', component: ScrapyardComponent },
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio/:id', component: PortfolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
