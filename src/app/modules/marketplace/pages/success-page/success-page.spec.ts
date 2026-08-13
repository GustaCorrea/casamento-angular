import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPage } from './success-page';

describe('SuccessPage', () => {
  let component: SuccessPage;
  let fixture: ComponentFixture<SuccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
