import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetsDataTableComponent } from './sheets-data-table.component';

describe('SheetsDataTableComponent', () => {
  let component: SheetsDataTableComponent;
  let fixture: ComponentFixture<SheetsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetsDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
