import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoQuizComponent } from './geo-quiz.component';

describe('GeoQuizComponent', () => {
  let component: GeoQuizComponent;
  let fixture: ComponentFixture<GeoQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
