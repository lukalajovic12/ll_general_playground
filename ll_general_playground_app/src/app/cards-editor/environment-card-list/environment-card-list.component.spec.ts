import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentCardListComponent } from './environment-card-list.component';

describe('EnciormentCardListComponent', () => {
  let component: EnvironmentCardListComponent;
  let fixture: ComponentFixture<EnvironmentCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
