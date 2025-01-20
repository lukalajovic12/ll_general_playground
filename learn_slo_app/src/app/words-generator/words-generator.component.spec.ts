import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsGeneratorComponent } from './words-generator.component';

describe('WordsGeneratorComponent', () => {
  let component: WordsGeneratorComponent;
  let fixture: ComponentFixture<WordsGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
