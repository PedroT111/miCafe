import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcustomersBymonthComponent } from './newcustomers-bymonth.component';

describe('NewcustomersBymonthComponent', () => {
  let component: NewcustomersBymonthComponent;
  let fixture: ComponentFixture<NewcustomersBymonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcustomersBymonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcustomersBymonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
