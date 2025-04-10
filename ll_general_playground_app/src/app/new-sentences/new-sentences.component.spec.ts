import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSentencesComponent } from './new-sentences.component';

describe('NewSentencesComponent', () => {
  let component: NewSentencesComponent;
  let fixture: ComponentFixture<NewSentencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSentencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
