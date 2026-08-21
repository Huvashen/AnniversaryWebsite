import { TestBed } from '@angular/core/testing';
import { AccessService } from './access.service';

describe('AccessService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('rejects an incorrect passcode', () => {
    const service = TestBed.inject(AccessService);
    expect(service.unlock('incorrect')).toBe(false);
    expect(service.isUnlocked()).toBe(false);
  });

  it('unlocks and locks the experience', () => {
    const service = TestBed.inject(AccessService);
    expect(service.unlock('12/10/2025')).toBe(true);
    expect(service.isUnlocked()).toBe(true);
    service.lock();
    expect(service.isUnlocked()).toBe(false);
  });

  it('accepts the date with or without separators', () => {
    const service = TestBed.inject(AccessService);
    expect(service.unlock('12102025')).toBe(true);
  });
});
