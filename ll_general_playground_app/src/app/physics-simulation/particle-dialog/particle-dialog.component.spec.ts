import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleDialogComponent } from './particle-dialog.component';

describe('ParticleDialogComponent', () => {
  let component: ParticleDialogComponent;
  let fixture: ComponentFixture<ParticleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
