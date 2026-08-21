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

    animate('.intro-beam', {
      scaleY: { from: 0, to: 1 },
      opacity: { from: 0, to: 1 },
      delay: stagger(70),
      duration: 780,
      ease: 'inOut(4)',
    });
    animate('.intro-letter', {
      opacity: { from: 0, to: 1 },
      scaleX: { from: 0.15, to: 1 },
      filter: { from: 'blur(16px)', to: 'blur(0px)' },
      delay: stagger(85, { start: 500 }),
      duration: 900,
      ease: 'out(4)',
    });
    animate('.intro-wordmark', {
      scale: { from: 1.08, to: 1 },
      filter: { from: 'brightness(2.4)', to: 'brightness(1)' },
      delay: 1100,
      duration: 1500,
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
