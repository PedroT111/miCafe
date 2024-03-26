import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosSectionComponent } from './combos-section.component';

describe('CombosSectionComponent', () => {
  let component: CombosSectionComponent;
  let fixture: ComponentFixture<CombosSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombosSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
