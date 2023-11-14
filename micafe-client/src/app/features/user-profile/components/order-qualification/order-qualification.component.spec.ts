import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQualificationComponent } from './order-qualification.component';

describe('OrderQualificationComponent', () => {
  let component: OrderQualificationComponent;
  let fixture: ComponentFixture<OrderQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderQualificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
