import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordsComponent } from './new-words.component';

describe('NewWordsComponent', () => {
  let component: NewWordsComponent;
  let fixture: ComponentFixture<NewWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
