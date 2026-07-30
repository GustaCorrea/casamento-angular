import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpPage } from './rsvp-page';

describe('RsvpPage', () => {
  let component: RsvpPage;
  let fixture: ComponentFixture<RsvpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RsvpPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RsvpPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
