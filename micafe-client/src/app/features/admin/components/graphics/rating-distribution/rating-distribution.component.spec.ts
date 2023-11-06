import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingDistributionComponent } from './rating-distribution.component';

describe('RatingDistributionComponent', () => {
  let component: RatingDistributionComponent;
  let fixture: ComponentFixture<RatingDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
