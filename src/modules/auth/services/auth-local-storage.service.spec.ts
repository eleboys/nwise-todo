import { TestBed } from '@angular/core/testing';

import { AuthLocalStorageService } from './auth-local-storage.service';

describe('AuthLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthLocalStorageService = TestBed.get(AuthLocalStorageService);
    expect(service).toBeTruthy();
  });
});
