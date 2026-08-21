import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SITE_CONTENT } from '../../../../core/config/site-content';
import { AccessService } from '../../../../core/services/access.service';
import { AnimationService } from '../../../../core/animations/animation.service';

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
  private readonly passcodeInput = viewChild<ElementRef<HTMLInputElement>>('passcodeInput');

  readonly content = SITE_CONTENT.entrance;
  readonly profileSelected = signal(false);
  readonly errorMessage = signal('');
  passcode = '';

  ngAfterViewInit(): void {
    this.animations.reveal('.entrance-reveal');
  }

  selectProfile(): void {
    this.profileSelected.set(true);
    this.errorMessage.set('');
    setTimeout(() => this.passcodeInput()?.nativeElement.focus());
  }

  enterStory(): void {
    if (!this.access.unlock(this.passcode)) {
      this.errorMessage.set('That code does not feel quite right. Try our forever word.');
      this.animations.shake('.passcode-panel');
      return;
    }

    void this.router.navigate(['/browse']);
  }
}
