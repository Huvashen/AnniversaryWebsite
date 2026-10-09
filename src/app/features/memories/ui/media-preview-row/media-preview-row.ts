import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoryMediaItem } from '../../../../shared/models/story-media.model';
import { MediaLibraryType } from '../../data-access/media-library.catalog';
import { MediaTile } from '../media-tile/media-tile';

@Component({
  selector: 'app-media-preview-row',
  imports: [RouterLink, MediaTile],
  templateUrl: './media-preview-row.html',
  styleUrl: './media-preview-row.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPreviewRow {
  readonly title = input.required<string>();
  readonly type = input.required<MediaLibraryType>();
  readonly items = input.required<readonly StoryMediaItem[]>();
  readonly showExploreAll = input(false);
  readonly mediaSelected = output<StoryMediaItem>();

  scrollRail(rail: HTMLElement, direction: -1 | 1): void {
    rail.scrollBy({ left: direction * rail.clientWidth * 0.9, behavior: 'smooth' });
  }
}
