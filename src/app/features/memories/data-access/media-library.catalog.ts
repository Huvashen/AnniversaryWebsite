import {
  StoryImageItem,
  StoryMediaItem,
  StoryVideoItem,
} from '../../../shared/models/story-media.model';
import { STORY_MONTAGE } from './story-montage.catalog';

export type MediaLibraryType = StoryMediaItem['type'];

export const STORY_IMAGES: readonly StoryImageItem[] = STORY_MONTAGE.filter(
  (item): item is StoryImageItem => item.type === 'image',
);

export const STORY_VIDEOS: readonly StoryVideoItem[] = STORY_MONTAGE.filter(
  (item): item is StoryVideoItem => item.type === 'video',
);

export function mediaTitle(type: MediaLibraryType, position: number): string {
  return type === 'image'
    ? `Memory ${String(position).padStart(2, '0')}`
    : `Video ${String(position).padStart(2, '0')}`;
}

export function mediaKind(type: MediaLibraryType): string {
  return type === 'image' ? 'Photo' : 'Video';
}
