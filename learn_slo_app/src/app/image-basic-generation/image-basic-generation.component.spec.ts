import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBasicGenerationComponent } from './image-basic-generation.component';

describe('ImageBasicGenerationComponent', () => {
  let component: ImageBasicGenerationComponent;
  let fixture: ComponentFixture<ImageBasicGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageBasicGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageBasicGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
