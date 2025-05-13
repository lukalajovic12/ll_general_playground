import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsSimulationComponent } from './physics-simulation.component';

describe('PhysicsSimulationComponent', () => {
  let component: PhysicsSimulationComponent;
  let fixture: ComponentFixture<PhysicsSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicsSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicsSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
