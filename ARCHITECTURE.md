# Browser Extension Architecture

This document describes the framework used to build cross-browser extensions with Vue.js and Vite. The same codebase can target Chrome, Firefox, and Progressive Web App.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Vue.js 3 with Composition API |
| Build | Vite 5 |
| Testing | Vitest + Vue Test Utils + jsdom |
| Packaging | web-ext |

## Directory Structure

```
src/
├── components/      # Single File Components (.vue)
├── shared/          # Reusable UI components
├── utils/           # Utilities (storage, formatters, etc.)
├── background/      # Background service worker (optional)
├── content/         # Content scripts (optional)
└── main.js          # Entry point

scripts/             # Deployment automation
manifest.chrome.json # Chrome manifest
manifest.firefox.json # Firefox manifest
manifest.webmanifest # PWA manifest
vite.config.js       # Build configuration
vitest.config.js     # Test configuration
```

## Multi-Platform Build System

Environment variables control the build target:

```bash
TARGET_BROWSER=chrome vite build   # Chrome extension
TARGET_BROWSER=firefox vite build  # Firefox extension (default)
VITE_PWA=true vite build           # Progressive Web App
```

The `vite.config.js` uses `vite-plugin-static-copy` to copy the appropriate manifest file to `dist/manifest.json` based on the environment variable.

## Why Separate Manifests?

Chrome and Firefox have slightly different Manifest V3 requirements. Using separate manifests allows:

- Browser-specific permissions and settings
- Different `action` vs `browser_action` configurations
- Platform-specific keys like `browser_specific_settings` for Firefox

## Storage Abstraction Pattern

Browser extensions use async `browser.storage.local`. PWAs use synchronous `localStorage`. The storage abstraction detects the environment and uses the appropriate API:

```javascript
function isExtensionStorageAvailable() {
  return typeof browser !== 'undefined' && browser.storage && browser.storage.local;
}
```

All storage operations go through this abstraction, allowing the same code to work everywhere.

## Extension Types

This framework supports common browser extension patterns. Configure your extension type in the manifest:

| Type | Manifest Key | Description |
|------|--------------|-------------|
| New Tab Override | `chrome_url_overrides.newtab` | Replace the new tab page |
| Popup | `action.default_popup` | Toolbar popup |
| Options Page | `options_page` or `options_ui` | Full settings page |
| Content Script | `content_scripts` | Inject scripts into web pages |
| Background | `background.service_worker` | Service worker for background tasks |

Add optional directories as needed:
- `src/background/` - Background service worker
- `src/content/` - Content scripts
- `src/popup/` - Popup page component

## Build and Deploy Workflow

```
development → npm run dev:firefox
            → npm run dev:chrome
            → npm run dev:pwa

testing     → npm run test
            → npm run test:coverage

deployment  → npm run deploy:firefox
            → npm run deploy:chrome
            → npm run deploy:pwa
```

Deployment scripts:
1. Run test coverage
2. Clean previous builds
3. Build with target-specific environment variable
4. Package extension using `web-ext build`
5. Zip source code for distribution

## Entry Points

Configure entry points in `vite.config.js` based on your extension type:

| File | Purpose |
|------|---------|
| `index.html` | Main page (new tab, options, etc.) |
| `popup.html` | Popup toolbar page |
| `index.pwa.html` | PWA entry with service worker |

Vite's `rollupOptions.input` can define multiple entry points for complex extensions.

## Testing Strategy

- Unit tests for utilities alongside source files (`*.test.js`)
- Component tests using Vue Test Utils and jsdom
- Coverage enforced via `vitest --coverage`
- Tests run before every deployment

