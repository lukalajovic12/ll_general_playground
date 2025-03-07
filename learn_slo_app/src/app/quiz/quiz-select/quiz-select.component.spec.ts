import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSelectComponent } from './quiz-select.component';

describe('QuizSelectComponent', () => {
  let component: QuizSelectComponent;
  let fixture: ComponentFixture<QuizSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
