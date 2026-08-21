import { Injectable, signal } from '@angular/core';
import { SITE_CONTENT } from '../config/site-content';

const ACCESS_KEY = 'anniversary-access-granted';

@Injectable({ providedIn: 'root' })
export class AccessService {
  private readonly accessGranted = signal(this.restoreAccess());
  readonly isUnlocked = this.accessGranted.asReadonly();

  unlock(passcode: string): boolean {
    const isValid = passcode.trim().toLowerCase() === SITE_CONTENT.entrance.passcode.toLowerCase();

    if (isValid) {
      sessionStorage.setItem(ACCESS_KEY, 'true');
      this.accessGranted.set(true);
    }

    return isValid;
  }

  lock(): void {
    sessionStorage.removeItem(ACCESS_KEY);
    this.accessGranted.set(false);
  }

  private restoreAccess(): boolean {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(ACCESS_KEY) === 'true';
  }
}
