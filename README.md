# Anniversary Website

An interactive anniversary experience built with Angular, Tailwind CSS, and Anime.js.

## Start locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.

The date passcode is `12/10/2025` (separators are optional). Change it in
`src/app/core/config/site-content.ts` before sharing the site.

## Production build

```bash
npm run build
```

## Deployment

`Development` is the integration branch and `main` is production. Pushing to `main`
automatically builds and deploys the site to GitHub Pages at:

`https://huvashen.github.io/AnniversaryWebsite/`

The Pages workflow builds with the repository base path and publishes the browser
bundle. It also creates a `404.html` fallback so Angular routes continue to work
when a page is refreshed directly.

## Architecture

```text
src/app/
├── core/                 # App-wide singletons, guards, and animation utilities
│   ├── animations/
│   ├── guards/
│   └── services/
├── features/             # Independent user-facing areas
│   ├── home/
│   │   └── pages/
│   ├── entrance/
│   │   └── pages/
│   └── memories/
│       ├── data-access/
│       └── ui/
├── shared/               # Reusable code with no feature-specific dependencies
│   ├── models/
│   └── ui/
├── app.config.ts
└── app.routes.ts
```

Keep business code inside its feature. Promote a component or model to `shared`
only when multiple features use it, and reserve `core` for one-instance,
application-wide behavior.

## Add personal media

Place optimized files under `public/media/` and reference them from
`src/app/features/memories/data-access/memory-catalog.ts`:

```ts
{
  imageUrl: 'media/our-favourite-day/cover.webp',
  galleryUrls: [
    'media/our-favourite-day/photo-02.webp',
    'media/our-favourite-day/photo-03.webp',
  ],
  videoUrl: 'media/our-favourite-day/highlight.mp4',
}
```

Use WebP or AVIF for photographs where possible. Keep videos short and compressed,
prefer MP4 (H.264), and add a cover image for every video.
