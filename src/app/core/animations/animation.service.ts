import { Injectable } from '@angular/core';
import { animate, stagger } from 'animejs';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  reveal(targets: string | Element | NodeListOf<Element>): void {
    if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    animate(targets, {
      opacity: { from: 0, to: 1 },
      y: { from: 28, to: 0 },
      delay: stagger(120),
      duration: 900,
      ease: 'out(3)',
    });
  }

  shake(targets: string | Element): void {
    if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    animate(targets, {
      x: [0, -10, 9, -7, 5, 0],
      duration: 520,
      ease: 'out(3)',
    });
  }
}
