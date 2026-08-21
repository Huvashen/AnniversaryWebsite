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

  playCinematicIntro(): void {
    if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    animate('.light-streak', {
      scaleX: { from: 0, to: 1 },
      opacity: { from: 0, to: 1 },
      delay: stagger(45),
      duration: 680,
      ease: 'inOut(4)',
    });
    animate('.n-segment', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0.05, to: 1 },
      filter: { from: 'brightness(4)', to: 'brightness(1)' },
      delay: stagger(180, { start: 240 }),
      duration: 820,
      ease: 'out(4)',
    });
    animate('.n-logo', {
      scale: { from: 0.88, to: 1.08 },
      filter: { from: 'drop-shadow(0 0 0 #e50914)', to: 'drop-shadow(0 0 28px #e50914)' },
      delay: 950,
      duration: 1400,
      ease: 'out(3)',
    });
  }

  openModal(target: string | Element): void {
    animate(target, {
      opacity: { from: 0, to: 1 },
      scale: { from: 0.88, to: 1 },
      y: { from: 24, to: 0 },
      duration: 420,
      ease: 'out(4)',
    });
  }
}
