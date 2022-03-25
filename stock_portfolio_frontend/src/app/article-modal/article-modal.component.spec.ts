import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleModalComponent } from './article-modal.component';

describe('ArticleModalComponent', () => {
  let component: ArticleModalComponent;
  let fixture: ComponentFixture<ArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
