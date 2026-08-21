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

    animate('.n-image-frame', {
      opacity: { from: 0, to: 1 },
      scale: { from: 0.82, to: 1 },
      duration: 820,
      ease: 'out(4)',
    });
    animate('.n-image', {
      filter: [
        'brightness(0.35) drop-shadow(0 0 0 #e50914)',
        'brightness(1.35) drop-shadow(0 0 26px #e50914)',
        'brightness(1) drop-shadow(0 0 8px #e50914)',
      ],
      scale: [0.96, 1.035, 1],
      duration: 1450,
      ease: 'out(4)',
    });
    animate('.red-halo', {
      opacity: [0, 0.32, 0.08],
      scale: { from: 0.35, to: 1.15 },
      delay: 680,
      duration: 1450,
      ease: 'out(3)',
    });
    animate('.n-image-frame', {
      scale: { from: 1, to: 1.13 },
      delay: 1650,
      duration: 1150,
      ease: 'inOut(3)',
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
