import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsEditorComponent } from './cards-editor.component';

describe('CardsEditorComponent', () => {
  let component: CardsEditorComponent;
  let fixture: ComponentFixture<CardsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
