import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { StoryImageItem, StoryMediaItem } from '../../../../shared/models/story-media.model';

@Component({
  selector: 'app-story-montage-player',
  templateUrl: './story-montage-player.html',
  styleUrl: './story-montage-player.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryMontagePlayer implements OnDestroy {
  readonly items = input.required<readonly StoryMediaItem[]>();
  readonly activeIndex = signal(0);
  readonly progress = signal(0);
  readonly muted = signal(false);
  readonly paused = signal(false);
  readonly controlsVisible = signal(false);
  readonly activeItem = computed(() => this.items()[this.activeIndex()]);
  readonly itemNumber = computed(() =>
    String(this.activeIndex() + 1).padStart(String(this.items().length).length, '0'),
  );
  readonly itemTotal = computed(() => String(this.items().length).padStart(2, '0'));
  readonly activeVideo = viewChild<ElementRef<HTMLVideoElement>>('activeVideo');

  private imageTimer?: number;
  private controlsTimer?: number;
  private imageStartedAt = 0;
  private imageElapsed = 0;
  private imageDuration = 5000;

  @HostListener('document:keydown.arrowleft') previous(): void {
    this.goTo(this.activeIndex() - 1);
  }

  @HostListener('document:keydown.arrowright') next(): void {
    this.goTo(this.activeIndex() + 1);
  }

  ngOnDestroy(): void {
    this.clearImageTimer();
    this.clearControlsTimer();
  }

  showControls(): void {
    this.controlsVisible.set(true);
    this.clearControlsTimer();

    if (!this.paused()) {
      this.controlsTimer = window.setTimeout(() => this.controlsVisible.set(false), 2200);
    }
  }

  onImageLoaded(item: StoryImageItem): void {
    this.clearImageTimer();
    this.imageDuration = item.durationMs;
    this.imageElapsed = 0;
    this.progress.set(0);
    this.paused.set(false);
    this.runImageTimer();
  }

  onVideoReady(video: HTMLVideoElement): void {
    this.progress.set(0);
    video.muted = this.muted();
    void video.play().catch(() => {
      this.muted.set(true);
      video.muted = true;
      void video.play().catch(() => this.paused.set(true));
    });
  }

  onVideoProgress(video: HTMLVideoElement): void {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      this.progress.set((video.currentTime / video.duration) * 100);
    }
  }

  togglePlayback(): void {
    const video = this.activeVideo()?.nativeElement;
    if (video) {
      if (video.paused) {
        void video.play();
        this.paused.set(false);
        this.showControls();
      } else {
        video.pause();
        this.paused.set(true);
        this.clearControlsTimer();
      }
      return;
    }

    if (this.paused()) {
      this.paused.set(false);
      this.runImageTimer();
      this.showControls();
    } else {
      this.pauseImageTimer();
      this.paused.set(true);
      this.clearControlsTimer();
    }
  }

  toggleMute(): void {
    this.muted.update((value) => !value);
    const video = this.activeVideo()?.nativeElement;
    if (video) video.muted = this.muted();
  }

  seek(seconds: number): void {
    const video = this.activeVideo()?.nativeElement;
    if (!video || !Number.isFinite(video.duration)) return;

    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration);
    this.onVideoProgress(video);
  }

  private goTo(index: number): void {
    const itemCount = this.items().length;
    if (!itemCount) return;

    this.clearImageTimer();
    this.imageElapsed = 0;
    this.progress.set(0);
    this.paused.set(false);
    this.activeIndex.set((index + itemCount) % itemCount);
  }

  private runImageTimer(): void {
    this.clearImageTimer();
    this.imageStartedAt = performance.now();
    this.imageTimer = window.setInterval(() => {
      const elapsed = this.imageElapsed + performance.now() - this.imageStartedAt;
      this.progress.set(Math.min((elapsed / this.imageDuration) * 100, 100));
      if (elapsed >= this.imageDuration) this.next();
    }, 80);
  }

  private pauseImageTimer(): void {
    if (this.imageTimer === undefined) return;
    this.imageElapsed += performance.now() - this.imageStartedAt;
    this.clearImageTimer();
  }

  private clearImageTimer(): void {
    if (this.imageTimer !== undefined) {
      window.clearInterval(this.imageTimer);
      this.imageTimer = undefined;
    }
  }

  private clearControlsTimer(): void {
    if (this.controlsTimer !== undefined) {
      window.clearTimeout(this.controlsTimer);
      this.controlsTimer = undefined;
    }
  }
}
