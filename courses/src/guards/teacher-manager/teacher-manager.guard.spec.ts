import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teacherManagerGuard } from './teacher-manager.guard';

describe('teacherManagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teacherManagerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
