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

    animate('.netflix-n-logo', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0.02, to: 1 },
      y: { from: 24, to: 0 },
      delay: 120,
      duration: 760,
      ease: 'out(4)',
    });
    animate('.logo-scan', {
      opacity: [0, 1, 0],
      x: { from: '-180%', to: '760%' },
      delay: 560,
      duration: 920,
      ease: 'inOut(3)',
    });
    animate('.logo-mark', {
      filter: [
        'brightness(0.45) drop-shadow(0 0 0 #e50914)',
        'brightness(1.4) drop-shadow(0 0 28px #e50914)',
        'brightness(1) drop-shadow(0 0 9px #e50914)',
      ],
      scale: [0.92, 1.035, 1],
      delay: 260,
      duration: 1550,
      ease: 'out(4)',
    });
    animate('.red-trail', {
      opacity: [0, 0.65, 0],
      scaleY: { from: 0.08, to: 1 },
      delay: stagger(35, { start: 1180, from: 'center' }),
      duration: 780,
      ease: 'out(3)',
    });
    animate('.red-halo', {
      opacity: [0, 0.34, 0.08],
      scale: { from: 0.35, to: 1.25 },
      delay: 820,
      duration: 1550,
      ease: 'out(3)',
    });
    animate('.logo-stage', {
      scale: { from: 1, to: 1.24 },
      filter: { from: 'blur(0px)', to: 'blur(1.5px)' },
      delay: 1780,
      duration: 1120,
      ease: 'in(3)',
    });
    animate('.intro-screen', {
      opacity: { from: 1, to: 0 },
      delay: 3260,
      duration: 620,
      ease: 'in(3)',
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
