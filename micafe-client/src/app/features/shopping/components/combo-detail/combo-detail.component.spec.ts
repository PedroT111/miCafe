import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboDetailComponent } from './combo-detail.component';

describe('ComboDetailComponent', () => {
  let component: ComboDetailComponent;
  let fixture: ComponentFixture<ComboDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
