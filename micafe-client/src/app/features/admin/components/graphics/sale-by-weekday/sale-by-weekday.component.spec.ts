import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByWeekdayComponent } from './sale-by-weekday.component';

describe('SaleByWeekdayComponent', () => {
  let component: SaleByWeekdayComponent;
  let fixture: ComponentFixture<SaleByWeekdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleByWeekdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleByWeekdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
