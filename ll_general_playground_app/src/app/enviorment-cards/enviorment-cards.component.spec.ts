import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviormentCardsComponent } from './enviorment-cards.component';

describe('EnviormentCardsComponent', () => {
  let component: EnviormentCardsComponent;
  let fixture: ComponentFixture<EnviormentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviormentCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviormentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
