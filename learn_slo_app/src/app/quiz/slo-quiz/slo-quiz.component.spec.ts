import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SloQuizComponent } from './slo-quiz.component';

describe('SloQuizComponent', () => {
  let component: SloQuizComponent;
  let fixture: ComponentFixture<SloQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SloQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SloQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
