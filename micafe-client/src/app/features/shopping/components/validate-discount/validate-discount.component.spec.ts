import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDiscountComponent } from './validate-discount.component';

describe('ValidateDiscountComponent', () => {
  let component: ValidateDiscountComponent;
  let fixture: ComponentFixture<ValidateDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
