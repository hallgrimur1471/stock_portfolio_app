import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNewsTabComponent } from './top-news-tab.component';

describe('TopNewsTabComponent', () => {
  let component: TopNewsTabComponent;
  let fixture: ComponentFixture<TopNewsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNewsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNewsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
