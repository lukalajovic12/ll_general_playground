import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleFractalComponent } from './circle-fractal.component';

describe('CircleFractalComponent', () => {
  let component: CircleFractalComponent;
  let fixture: ComponentFixture<CircleFractalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleFractalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleFractalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
