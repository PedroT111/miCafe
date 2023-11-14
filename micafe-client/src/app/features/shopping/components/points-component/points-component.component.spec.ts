import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsComponentComponent } from './points-component.component';

describe('PointsComponentComponent', () => {
  let component: PointsComponentComponent;
  let fixture: ComponentFixture<PointsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
