import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceVariationProductComponent } from './price-variation-product.component';

describe('PriceVariationProductComponent', () => {
  let component: PriceVariationProductComponent;
  let fixture: ComponentFixture<PriceVariationProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceVariationProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceVariationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
