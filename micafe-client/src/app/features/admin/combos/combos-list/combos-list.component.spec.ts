import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosListComponent } from './combos-list.component';

describe('CombosListComponent', () => {
  let component: CombosListComponent;
  let fixture: ComponentFixture<CombosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
