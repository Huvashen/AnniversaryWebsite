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

    animate('.n-left', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0, to: 1 },
      duration: 430,
      ease: 'out(4)',
    });
    animate('.n-diagonal', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0, to: 1 },
      delay: 320,
      duration: 620,
      ease: 'out(4)',
    });
    animate('.n-right', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0, to: 1 },
      delay: 760,
      duration: 430,
      ease: 'out(4)',
    });
    animate('.n-shine', {
      opacity: [0, 0.9, 0],
      y: { from: '-120%', to: '240%' },
      delay: 820,
      duration: 950,
      ease: 'inOut(3)',
    });
    animate('.red-halo', {
      opacity: [0, 0.38, 0.12],
      scale: { from: 0.4, to: 1.2 },
      delay: 1050,
      duration: 1250,
      ease: 'out(3)',
    });
    animate('.n-logo', {
      scale: [0.96, 1.03, 1],
      filter: [
        'drop-shadow(0 0 0 #e50914)',
        'drop-shadow(0 0 24px #e50914)',
        'drop-shadow(0 0 8px #e50914)',
      ],
      delay: 980,
      duration: 1450,
      ease: 'out(3)',
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
