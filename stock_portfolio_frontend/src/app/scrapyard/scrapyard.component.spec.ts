import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapyardComponent } from './scrapyard.component';

describe('ScrapyardComponent', () => {
  let component: ScrapyardComponent;
  let fixture: ComponentFixture<ScrapyardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapyardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
