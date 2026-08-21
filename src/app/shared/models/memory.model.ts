export interface Memory {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly category: MemoryCategory;
  readonly accent: string;
  readonly duration?: string;
  readonly imageUrl?: string;
  readonly galleryUrls?: readonly string[];
  readonly videoUrl?: string;
  readonly featured?: boolean;
}

export type MemoryCategory = 'favourites' | 'chapters' | 'adventures' | 'quiet-moments';
export interface MemoryRow {
  readonly id: MemoryCategory;
  readonly title: string;
  readonly memories: readonly Memory[];
}
