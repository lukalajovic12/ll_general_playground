import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceEditDialogComponent } from './sentence-edit-dialog.component';

describe('SentenceEditDialogComponent', () => {
  let component: SentenceEditDialogComponent;
  let fixture: ComponentFixture<SentenceEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
