# Memories data access

`story-montage.catalog.ts` is the single source of truth for the **Play Our Story**
montage. Its array order is the playback order. Images use `durationMs: 5000`; videos
play until their natural end.

Browser-ready media is stored separately from the catalogue:

- `/public/media/story-montage/images`
- `/public/media/story-montage/videos`

To change the montage later, add or remove the optimized media file and update its
matching catalogue entry. No player component changes are required.
