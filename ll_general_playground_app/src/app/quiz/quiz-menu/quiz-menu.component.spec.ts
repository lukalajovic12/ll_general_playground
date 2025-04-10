import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMenuComponent } from './quiz-menu.component';

describe('GeoMenuComponent', () => {
  let component: QuizMenuComponent;
  let fixture: ComponentFixture<QuizMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizMenuComponent]
    });
    fixture = TestBed.createComponent(QuizMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
