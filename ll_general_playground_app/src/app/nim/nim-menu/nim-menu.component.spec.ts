import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NimMenuComponent } from './nim-menu.component';

describe('NimMenuComponent', () => {
  let component: NimMenuComponent;
  let fixture: ComponentFixture<NimMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NimMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NimMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
