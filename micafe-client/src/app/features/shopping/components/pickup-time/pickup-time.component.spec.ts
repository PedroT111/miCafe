import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTimeComponent } from './pickup-time.component';

describe('PickupTimeComponent', () => {
  let component: PickupTimeComponent;
  let fixture: ComponentFixture<PickupTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
