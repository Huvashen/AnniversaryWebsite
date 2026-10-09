import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  inject,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../../core/animations/animation.service';
import { IntroStateService } from '../../../../core/services/intro-state.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.html',
  styleUrl: './intro-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroPage implements AfterViewInit, OnDestroy {
  private readonly animations = inject(AnimationService);
  private readonly router = inject(Router);
  private readonly introState = inject(IntroStateService);
  private readonly audio = viewChild<ElementRef<HTMLAudioElement>>('introAudio');
  private readonly audioRetryDelays = [0, 120, 360, 800];
  private readonly audioRetryTimers = new Set<number>();
  private audioPlayPending = false;
  private audioStarted = false;

  ngAfterViewInit(): void {
    const audio = this.audio()?.nativeElement;
    if (audio) {
      audio.volume = 1;
      audio.muted = false;
      audio.currentTime = 0;
      audio.addEventListener('canplay', this.tryAudioPlayback, { once: true });
      audio.addEventListener('loadeddata', this.tryAudioPlayback, { once: true });
      audio.load();
      this.audioRetryDelays.forEach((delay) => {
        const timer = window.setTimeout(() => {
          this.audioRetryTimers.delete(timer);
          void this.tryAudioPlayback();
        }, delay);
        this.audioRetryTimers.add(timer);
      });
    }
    this.runIntro();
  }

  ngOnDestroy(): void {
    this.clearAudioRetries();
    const audio = this.audio()?.nativeElement;
    audio?.removeEventListener('canplay', this.tryAudioPlayback);
    audio?.removeEventListener('loadeddata', this.tryAudioPlayback);
  }

  @HostListener('document:pointerdown')
  @HostListener('document:keydown')
  onUserInteraction(): void {
    void this.tryAudioPlayback();
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.visibilityState === 'visible') void this.tryAudioPlayback();
  }

  private readonly tryAudioPlayback = async (): Promise<void> => {
    const audio = this.audio()?.nativeElement;
    if (
      !audio ||
      this.audioStarted ||
      this.audioPlayPending ||
      document.visibilityState === 'hidden'
    ) {
      return;
    }

    this.audioPlayPending = true;
    try {
      await audio.play();
      this.audioStarted = true;
      this.clearAudioRetries();
    } catch {
      // Autoplay may be blocked until the first pointer or keyboard interaction.
    } finally {
      this.audioPlayPending = false;
    }
  };

  private clearAudioRetries(): void {
    this.audioRetryTimers.forEach((timer) => window.clearTimeout(timer));
    this.audioRetryTimers.clear();
  }

  private runIntro(): void {
    setTimeout(() => this.animations.playCinematicIntro());
    setTimeout(() => {
      this.introState.markComplete();
      void this.router.navigate(['/welcome']);
    }, 4050);
  }
}
