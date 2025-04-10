import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizWordsComponent } from './quiz-words.component';

describe('QuizWordsComponent', () => {
  let component: QuizWordsComponent;
  let fixture: ComponentFixture<QuizWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
