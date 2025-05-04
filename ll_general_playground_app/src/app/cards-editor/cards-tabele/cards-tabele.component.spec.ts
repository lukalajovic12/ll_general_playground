import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTabeleComponent } from './cards-tabele.component';

describe('CardsTabeleComponent', () => {
  let component: CardsTabeleComponent;
  let fixture: ComponentFixture<CardsTabeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsTabeleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsTabeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
