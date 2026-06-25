import { TestBed } from '@angular/core/testing';

import { Presente } from './presente';

describe('Presente', () => {
  let service: Presente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Presente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
