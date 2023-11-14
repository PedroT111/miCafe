import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSellPeriodComponent } from './total-sell-period.component';

describe('TotalSellPeriodComponent', () => {
  let component: TotalSellPeriodComponent;
  let fixture: ComponentFixture<TotalSellPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSellPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSellPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
