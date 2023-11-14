import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoriesMobileComponent } from './menu-categories-mobile.component';

describe('MenuCategoriesMobileComponent', () => {
  let component: MenuCategoriesMobileComponent;
  let fixture: ComponentFixture<MenuCategoriesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCategoriesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCategoriesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
