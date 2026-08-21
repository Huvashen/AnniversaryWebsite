import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../../core/animations/animation.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements AfterViewInit {
  private readonly animations = inject(AnimationService);
  private readonly router = inject(Router);
  ngAfterViewInit(): void {
    this.animations.reveal('.profile-reveal');
  }
  selectYear(): void {
    void this.router.navigate(['/browse']);
  }
}
