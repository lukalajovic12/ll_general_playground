import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetsTableComponent } from './sheets-table.component';

describe('SheetsTableComponent', () => {
  let component: SheetsTableComponent;
  let fixture: ComponentFixture<SheetsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
