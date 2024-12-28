import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItQuizComponent } from './it-quiz.component';

describe('ItQuizComponent', () => {
  let component: ItQuizComponent;
  let fixture: ComponentFixture<ItQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
