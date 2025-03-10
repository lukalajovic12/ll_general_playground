import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSentencesComponent } from './quiz-sentences.component';

describe('QuizSentencesComponent', () => {
  let component: QuizSentencesComponent;
  let fixture: ComponentFixture<QuizSentencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSentencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
