import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByHourdayComponent } from './sales-by-hourday.component';

describe('SalesByHourdayComponent', () => {
  let component: SalesByHourdayComponent;
  let fixture: ComponentFixture<SalesByHourdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesByHourdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesByHourdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
