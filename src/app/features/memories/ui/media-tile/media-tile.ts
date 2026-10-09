import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { mediaKind, mediaTitle } from '../../data-access/media-library.catalog';
import { StoryMediaItem } from '../../../../shared/models/story-media.model';

@Component({
  selector: 'app-media-tile',
  templateUrl: './media-tile.html',
  styleUrl: './media-tile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaTile {
  readonly item = input.required<StoryMediaItem>();
  readonly position = input.required<number>();
  readonly selected = output<StoryMediaItem>();
  readonly title = computed(() => mediaTitle(this.item().type, this.position()));
  readonly kind = computed(() => mediaKind(this.item().type));

  revealVideoFrame(video: HTMLVideoElement): void {
    if (Number.isFinite(video.duration) && video.duration > 0.15) video.currentTime = 0.15;
  }
}
