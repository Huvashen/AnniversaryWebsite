# Anniversary Website

An interactive anniversary experience built with Angular, Tailwind CSS, and Anime.js.

## Start locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Production build

```bash
npm run build
```

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
