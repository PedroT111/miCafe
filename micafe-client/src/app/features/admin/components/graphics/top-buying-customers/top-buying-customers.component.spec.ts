import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBuyingCustomersComponent } from './top-buying-customers.component';

describe('TopBuyingCustomersComponent', () => {
  let component: TopBuyingCustomersComponent;
  let fixture: ComponentFixture<TopBuyingCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBuyingCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBuyingCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
