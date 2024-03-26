import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountFiltersFormComponent } from './discount-filters-form.component';

describe('DiscountFiltersFormComponent', () => {
  let component: DiscountFiltersFormComponent;
  let fixture: ComponentFixture<DiscountFiltersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountFiltersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
