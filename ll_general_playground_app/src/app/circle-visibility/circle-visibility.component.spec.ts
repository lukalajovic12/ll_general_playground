import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleVisibilityComponent } from './circle-visibility.component';

describe('CircleVisibilityComponent', () => {
  let component: CircleVisibilityComponent;
  let fixture: ComponentFixture<CircleVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleVisibilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
