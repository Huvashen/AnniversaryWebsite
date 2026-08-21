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
      duration: 360,
      ease: 'out(4)',
    });
    animate('.n-diagonal, .n-fold', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0, to: 1 },
      delay: stagger(55, { start: 280 }),
      duration: 520,
      ease: 'out(4)',
    });
    animate('.n-right', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0, to: 1 },
      delay: 620,
      duration: 390,
      ease: 'out(4)',
    });
    animate('.n-logo', {
      filter: { from: 'drop-shadow(0 0 0 #e50914)', to: 'drop-shadow(0 0 25px #e50914)' },
      delay: 760,
      duration: 580,
      ease: 'out(4)',
    });
    animate('.intro-flash', {
      opacity: [0, 0.72, 0],
      delay: 1260,
      duration: 650,
      ease: 'inOut(3)',
    });
    animate('.n-logo', {
      scale: { from: 1, to: 14 },
      opacity: [1, 1, 0],
      delay: 1420,
      duration: 1050,
      ease: 'in(4)',
    });
    animate('.spectrum-field', {
      opacity: { from: 0, to: 1 },
      delay: 1520,
      duration: 260,
      ease: 'linear',
    });
    animate('.spectrum-streak', {
      opacity: { from: 0, to: 1 },
      scaleY: { from: 0.04, to: 1 },
      delay: stagger(13, { start: 1540, from: 'center' }),
      duration: 560,
      ease: 'out(4)',
    });
    animate('.spectrum-field', {
      scaleX: { from: 1, to: 1.85 },
      filter: { from: 'blur(0px)', to: 'blur(10px)' },
      opacity: { from: 1, to: 0 },
      delay: 2600,
      duration: 980,
      ease: 'in(3)',
    });
    animate('.intro-screen', {
      opacity: { from: 1, to: 0 },
      delay: 3460,
      duration: 460,
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
