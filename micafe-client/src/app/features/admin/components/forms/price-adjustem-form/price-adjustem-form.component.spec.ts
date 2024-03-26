import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAdjustemFormComponent } from './price-adjustem-form.component';

describe('PriceAdjustemFormComponent', () => {
  let component: PriceAdjustemFormComponent;
  let fixture: ComponentFixture<PriceAdjustemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceAdjustemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceAdjustemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
