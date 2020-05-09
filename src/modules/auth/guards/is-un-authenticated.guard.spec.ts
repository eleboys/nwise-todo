import { TestBed, async, inject } from '@angular/core/testing';

import { IsUnAuthenticatedGuard } from './is-un-authenticated.guard';

describe('IsUnAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsUnAuthenticatedGuard]
    });
  });

  it('should ...', inject([IsUnAuthenticatedGuard], (guard: IsUnAuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
