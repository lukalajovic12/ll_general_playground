import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSvgGeneratorComponent } from './image-svg-generator.component';

describe('ImageSvgGeneratorComponent', () => {
  let component: ImageSvgGeneratorComponent;
  let fixture: ComponentFixture<ImageSvgGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSvgGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSvgGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
