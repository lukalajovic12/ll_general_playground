import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarkhadiTableComponent } from './barkhadi-table.component';

describe('BarkhadiTableComponent', () => {
  let component: BarkhadiTableComponent;
  let fixture: ComponentFixture<BarkhadiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarkhadiTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarkhadiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
