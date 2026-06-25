import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLayout } from './invite-layout';

describe('InviteLayout', () => {
  let component: InviteLayout;
  let fixture: ComponentFixture<InviteLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
