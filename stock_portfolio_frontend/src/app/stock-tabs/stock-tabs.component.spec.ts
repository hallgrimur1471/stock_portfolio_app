import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTabsComponent } from './stock-tabs.component';

describe('StockTabsComponent', () => {
  let component: StockTabsComponent;
  let fixture: ComponentFixture<StockTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
