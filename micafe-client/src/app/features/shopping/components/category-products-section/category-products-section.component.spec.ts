import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsSectionComponent } from './category-products-section.component';

describe('CategoryProductsSectionComponent', () => {
  let component: CategoryProductsSectionComponent;
  let fixture: ComponentFixture<CategoryProductsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryProductsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
