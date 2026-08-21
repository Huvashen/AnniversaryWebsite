import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IntroStateService } from '../services/intro-state.service';

export const introGuard: CanActivateFn = () => {
  const state = inject(IntroStateService);
  return state.hasPlayed() ? true : inject(Router).createUrlTree(['/intro']);
};
