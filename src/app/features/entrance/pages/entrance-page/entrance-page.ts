import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationService } from '../../../../core/animations/animation.service';
import { SITE_CONTENT } from '../../../../core/config/site-content';
import { AccessService } from '../../../../core/services/access.service';

@Component({
  selector: 'app-entrance-page',
  imports: [FormsModule],
  templateUrl: './entrance-page.html',
  styleUrl: './entrance-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntrancePage implements AfterViewInit {
  private readonly access = inject(AccessService);
  private readonly animations = inject(AnimationService);
  private readonly router = inject(Router);
  readonly content = SITE_CONTENT.entrance;
  readonly errorMessage = signal('');
  readonly hintOpen = signal(false);
  passcode = '';

  ngAfterViewInit(): void {
    this.animations.reveal('.entrance-reveal');
  }
  enterStory(): void {
    if (!this.access.unlock(this.passcode)) {
      this.errorMessage.set('That date does not match our first episode.');
      this.animations.shake('.login-card');
      return;
    }
    void this.router.navigate(['/browse']);
  }
  showHint(): void {
    this.hintOpen.set(true);
    setTimeout(() => this.animations.openModal('.hint-modal'));
  }
  closeHint(): void {
    this.hintOpen.set(false);
  }
}
