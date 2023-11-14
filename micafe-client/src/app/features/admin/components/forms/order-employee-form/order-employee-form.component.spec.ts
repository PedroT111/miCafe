import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEmployeeFormComponent } from './order-employee-form.component';

describe('OrderEmployeeFormComponent', () => {
  let component: OrderEmployeeFormComponent;
  let fixture: ComponentFixture<OrderEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderEmployeeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
