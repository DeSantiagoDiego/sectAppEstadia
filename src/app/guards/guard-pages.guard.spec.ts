import { TestBed } from '@angular/core/testing';

import { GuardPagesGuard } from './guard-pages.guard';

describe('GuardPagesGuard', () => {
  let guard: GuardPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
