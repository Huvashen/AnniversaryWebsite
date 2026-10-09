import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { StoryMediaItem } from '../../../../shared/models/story-media.model';
import { mediaTitle } from '../../data-access/media-library.catalog';

@Component({
  selector: 'app-media-gallery-viewer',
  templateUrl: './media-gallery-viewer.html',
  styleUrl: './media-gallery-viewer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaGalleryViewer implements OnInit {
  readonly items = input.required<readonly StoryMediaItem[]>();
  readonly startIndex = input(0);
  readonly closed = output<void>();
  readonly activeIndex = signal(0);
  readonly activeItem = computed(() => this.items()[this.activeIndex()]);
  readonly title = computed(() => mediaTitle(this.activeItem().type, this.activeIndex() + 1));
  readonly itemNumber = computed(() => String(this.activeIndex() + 1).padStart(2, '0'));
  readonly itemTotal = computed(() => String(this.items().length).padStart(2, '0'));

  ngOnInit(): void {
    this.activeIndex.set(this.clampIndex(this.startIndex()));
  }

  @HostListener('document:keydown.escape') close(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown.arrowleft') previous(): void {
    this.move(-1);
  }

  @HostListener('document:keydown.arrowright') next(): void {
    this.move(1);
  }

  move(direction: number): void {
    const count = this.items().length;
    if (count < 2) return;
    this.activeIndex.update((index) => (index + direction + count) % count);
  }

  private clampIndex(index: number): number {
    return Math.min(Math.max(index, 0), Math.max(this.items().length - 1, 0));
  }
}
