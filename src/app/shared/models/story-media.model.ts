export type StoryMediaItem = StoryImageItem | StoryVideoItem;

interface StoryMediaBase {
  readonly id: string;
  readonly src: string;
}

export interface StoryImageItem extends StoryMediaBase {
  readonly type: 'image';
  readonly alt: string;
  readonly durationMs: number;
}

export interface StoryVideoItem extends StoryMediaBase {
  readonly type: 'video';
  readonly label: string;
}
