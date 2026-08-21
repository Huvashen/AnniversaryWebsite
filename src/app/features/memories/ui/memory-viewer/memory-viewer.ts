import { ChangeDetectionStrategy, Component, HostListener, computed, input, output, signal } from '@angular/core';
import { Memory } from '../../../../shared/models/memory.model';

@Component({ selector: 'app-memory-viewer', templateUrl: './memory-viewer.html', styleUrl: './memory-viewer.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class MemoryViewer {
  readonly memory = input.required<Memory>();
  readonly closed = output<void>();
  readonly activeImageIndex = signal(0);
  readonly images = computed(() => {
    const memory = this.memory();
    return [memory.imageUrl, ...(memory.galleryUrls ?? [])].filter((url): url is string => Boolean(url));
  });
  readonly activeImage = computed(() => this.images()[this.activeImageIndex()]);

  @HostListener('document:keydown.escape') close(): void { this.closed.emit(); }
  @HostListener('document:keydown.arrowleft') previous(): void { this.move(-1); }
  @HostListener('document:keydown.arrowright') next(): void { this.move(1); }

  move(direction: number): void {
    const count = this.images().length;
    if (count < 2) return;
    this.activeImageIndex.update((index) => (index + direction + count) % count);
  }
}
