import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarMobileComponent } from './top-navbar-mobile.component';

describe('TopNavbarMobileComponent', () => {
  let component: TopNavbarMobileComponent;
  let fixture: ComponentFixture<TopNavbarMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavbarMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavbarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
