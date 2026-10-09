import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { AnimationService } from '../../../../core/animations/animation.service';
import { SiteHeader } from '../../../../shared/layout/site-header/site-header';
import { Memory } from '../../../../shared/models/memory.model';
import { StoryMediaItem } from '../../../../shared/models/story-media.model';
import { FEATURED_MEMORY } from '../../../memories/data-access/memory-catalog';
import { STORY_IMAGES, STORY_VIDEOS } from '../../../memories/data-access/media-library.catalog';
import { MediaGalleryViewer } from '../../../memories/ui/media-gallery-viewer/media-gallery-viewer';
import { MediaPreviewRow } from '../../../memories/ui/media-preview-row/media-preview-row';
import { MemoryViewer } from '../../../memories/ui/memory-viewer/memory-viewer';

const MEDIA_PREVIEW_LIMIT = 4;

@Component({
  selector: 'app-home-page',
  imports: [SiteHeader, MediaPreviewRow, MemoryViewer, MediaGalleryViewer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private readonly animations = inject(AnimationService);
  readonly featured = FEATURED_MEMORY;
  readonly heroImageUrl = 'media/story-montage/images/072-img-4860.jpg';
  readonly imagePreview = STORY_IMAGES.slice(0, MEDIA_PREVIEW_LIMIT);
  readonly videoPreview = STORY_VIDEOS.slice(0, MEDIA_PREVIEW_LIMIT);
  readonly hasMoreImages = STORY_IMAGES.length > this.imagePreview.length;
  readonly hasMoreVideos = STORY_VIDEOS.length > this.videoPreview.length;
  readonly selectedMemory = signal<Memory | null>(null);
  readonly selectedMediaIndex = signal<number | null>(null);
  readonly selectedMediaCollection = signal<readonly StoryMediaItem[]>([]);

  ngAfterViewInit(): void {
    this.animations.reveal('.hero-item');
  }

  @HostListener('document:keydown.escape') closeMemory(): void {
    this.selectedMemory.set(null);
    this.selectedMediaIndex.set(null);
    document.body.style.overflow = '';
  }

  openMemory(memory: Memory): void {
    this.selectedMemory.set(memory);
    document.body.style.overflow = 'hidden';
  }

  openMedia(item: StoryMediaItem): void {
    const collection = item.type === 'image' ? STORY_IMAGES : STORY_VIDEOS;
    this.selectedMediaCollection.set(collection);
    this.selectedMediaIndex.set(collection.findIndex((entry) => entry.id === item.id));
    document.body.style.overflow = 'hidden';
  }

  closeMedia(): void {
    this.selectedMediaIndex.set(null);
    document.body.style.overflow = '';
  }

  scrollToMemories(): void {
    document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' });
  }
}
