import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteHeader } from '../../../../shared/layout/site-header/site-header';
import { StoryMediaItem } from '../../../../shared/models/story-media.model';
import {
  MediaLibraryType,
  STORY_IMAGES,
  STORY_VIDEOS,
} from '../../data-access/media-library.catalog';
import { MediaGalleryViewer } from '../../ui/media-gallery-viewer/media-gallery-viewer';
import { MediaTile } from '../../ui/media-tile/media-tile';

const PAGE_SIZE = 24;

@Component({
  selector: 'app-memories-page',
  imports: [SiteHeader, MediaTile, MediaGalleryViewer],
  templateUrl: './memories-page.html',
  styleUrl: './memories-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoriesPage implements AfterViewInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly loadTrigger = viewChild<ElementRef<HTMLElement>>('loadTrigger');
  private observer?: IntersectionObserver;

  readonly activeType = signal<MediaLibraryType>(
    this.route.snapshot.queryParamMap.get('type') === 'video' ? 'video' : 'image',
  );
  readonly visibleCount = signal(PAGE_SIZE);
  readonly selectedIndex = signal<number | null>(null);
  readonly imageCount = STORY_IMAGES.length;
  readonly videoCount = STORY_VIDEOS.length;
  readonly media = computed<readonly StoryMediaItem[]>(() =>
    this.activeType() === 'image' ? STORY_IMAGES : STORY_VIDEOS,
  );
  readonly visibleMedia = computed(() => this.media().slice(0, this.visibleCount()));
  readonly hasMore = computed(() => this.visibleCount() < this.media().length);

  ngAfterViewInit(): void {
    const trigger = this.loadTrigger()?.nativeElement;
    if (!trigger) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) this.loadMore();
      },
      { rootMargin: '500px 0px' },
    );
    this.observer.observe(trigger);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape') closeViewer(): void {
    this.selectedIndex.set(null);
    document.body.style.overflow = '';
  }

  selectType(type: MediaLibraryType): void {
    this.activeType.set(type);
    this.visibleCount.set(PAGE_SIZE);
    this.selectedIndex.set(null);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type },
      replaceUrl: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openMedia(item: StoryMediaItem): void {
    this.selectedIndex.set(this.media().findIndex((entry) => entry.id === item.id));
    document.body.style.overflow = 'hidden';
  }

  loadMore(): void {
    if (!this.hasMore()) return;
    this.visibleCount.update((count) => Math.min(count + PAGE_SIZE, this.media().length));
  }
}
