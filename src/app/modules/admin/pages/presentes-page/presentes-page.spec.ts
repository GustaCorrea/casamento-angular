import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentesPage } from './presentes-page';

describe('PresentesPage', () => {
  let component: PresentesPage;
  let fixture: ComponentFixture<PresentesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PresentesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
