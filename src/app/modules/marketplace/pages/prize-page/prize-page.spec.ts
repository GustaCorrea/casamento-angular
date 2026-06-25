import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrizePage } from './prize-page'; // Mesma pasta, basta './prize-page'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('PrizePage', () => {
  let component: PrizePage;
  let fixture: ComponentFixture<PrizePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizePage ],
      imports: [ CommonModule, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});