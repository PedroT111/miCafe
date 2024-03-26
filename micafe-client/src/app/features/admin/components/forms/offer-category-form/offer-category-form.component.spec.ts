import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCategoryFormComponent } from './offer-category-form.component';

describe('OfferCategoryFormComponent', () => {
  let component: OfferCategoryFormComponent;
  let fixture: ComponentFixture<OfferCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
