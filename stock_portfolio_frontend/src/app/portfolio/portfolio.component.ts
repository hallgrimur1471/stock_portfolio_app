import { Component, OnInit } from '@angular/core';

import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio!: Portfolio;

  constructor(private ps: PortfolioService) { }

  ngOnInit(): void {
    this.getPortfolio();
  }

  private getPortfolio(): void {
    this.ps.getPortfolio()
      .subscribe(portfolio => this.portfolio = portfolio);
  }
}
