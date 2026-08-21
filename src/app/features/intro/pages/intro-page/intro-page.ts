import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
export class IntroPage implements AfterViewInit {
  private readonly animations = inject(AnimationService);
  private readonly router = inject(Router);
  private readonly introState = inject(IntroStateService);
  private readonly audio = viewChild<ElementRef<HTMLAudioElement>>('introAudio');
  ngAfterViewInit(): void {
    const audio = this.audio()?.nativeElement;
    if (audio) {
      void audio.play().catch(() => undefined);
    }
    this.runIntro();
  }

  private runIntro(): void {
    setTimeout(() => this.animations.playCinematicIntro());
    setTimeout(() => {
      this.introState.markComplete();
      void this.router.navigate(['/welcome']);
    }, 4050);
  }
}
