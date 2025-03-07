import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMatchComponent } from './quiz-match.component';

describe('QuizMatchComponent', () => {
  let component: QuizMatchComponent;
  let fixture: ComponentFixture<QuizMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
