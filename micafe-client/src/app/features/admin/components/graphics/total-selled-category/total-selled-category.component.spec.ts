import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSelledCategoryComponent } from './total-selled-category.component';

describe('TotalSelledCategoryComponent', () => {
  let component: TotalSelledCategoryComponent;
  let fixture: ComponentFixture<TotalSelledCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSelledCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSelledCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
