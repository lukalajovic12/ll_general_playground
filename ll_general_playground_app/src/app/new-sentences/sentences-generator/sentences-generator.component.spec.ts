import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentencesGeneratorComponent } from './sentences-generator.component';

describe('SentencesGeneratorComponent', () => {
  let component: SentencesGeneratorComponent;
  let fixture: ComponentFixture<SentencesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentencesGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentencesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
