import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccessService } from '../services/access.service';

export const accessGuard: CanActivateFn = () => {
  const access = inject(AccessService);
  return access.isUnlocked() ? true : inject(Router).createUrlTree(['/welcome']);
};
