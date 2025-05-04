import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimComponent } from './nim.component';

describe('NimComponent', () => {
  let component: NimComponent;
  let fixture: ComponentFixture<NimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NimComponent]
    });
    fixture = TestBed.createComponent(NimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
