import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingDistributionEmployeeComponent } from './rating-distribution-employee.component';

describe('RatingDistributionEmployeeComponent', () => {
  let component: RatingDistributionEmployeeComponent;
  let fixture: ComponentFixture<RatingDistributionEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingDistributionEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingDistributionEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
