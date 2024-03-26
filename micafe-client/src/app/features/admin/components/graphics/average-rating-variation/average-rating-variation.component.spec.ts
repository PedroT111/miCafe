import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageRatingVariationComponent } from './average-rating-variation.component';

describe('AverageRatingVariationComponent', () => {
  let component: AverageRatingVariationComponent;
  let fixture: ComponentFixture<AverageRatingVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageRatingVariationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageRatingVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
