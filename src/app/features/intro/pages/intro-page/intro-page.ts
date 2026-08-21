import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../../core/animations/animation.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.html',
  styleUrl: './intro-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroPage implements AfterViewInit {
  private readonly animations = inject(AnimationService);
  private readonly router = inject(Router);
  private readonly audio = viewChild<ElementRef<HTMLAudioElement>>('introAudio');
  readonly needsInteraction = signal(false);
  readonly started = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => this.tryAutoplay());
  }
  beginWithSound(): void {
    const audio = this.audio()?.nativeElement;
    if (!audio) {
      this.runIntro();
      return;
    }
    void audio
      .play()
      .then(() => this.runIntro())
      .catch(() => this.runIntro());
  }
  continueMuted(): void {
    this.runIntro();
  }
  private tryAutoplay(): void {
    const audio = this.audio()?.nativeElement;
    if (!audio) {
      this.runIntro();
      return;
    }
    void audio
      .play()
      .then(() => this.runIntro())
      .catch(() => this.needsInteraction.set(true));
  }
  private runIntro(): void {
    if (this.started()) return;
    this.started.set(true);
    this.needsInteraction.set(false);
    setTimeout(() => this.animations.playCinematicIntro());
    setTimeout(() => void this.router.navigate(['/welcome']), 3900);
  }
}
