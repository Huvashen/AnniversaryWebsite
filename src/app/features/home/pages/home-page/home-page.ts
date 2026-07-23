import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AnimationService } from '../../../../core/animations/animation.service';
import { RomanticButton } from '../../../../shared/ui/romantic-button/romantic-button';

@Component({
  selector: 'app-home-page',
  imports: [RomanticButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private readonly animations = inject(AnimationService);

  ngAfterViewInit(): void {
    this.animations.reveal('.intro-item');
  }

  scrollToStory(): void {
    document.querySelector('#our-story')?.scrollIntoView({ behavior: 'smooth' });
  }
}
