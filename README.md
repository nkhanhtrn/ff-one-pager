# FF One Pager - Firefox Extension with Vue.js

A Firefox extension built with Vue.js that displays a beautiful hello world popup.

## Features

- 🎨 Beautiful gradient UI
- 🔄 Interactive buttons with random messages
- 🔍 Get current tab information
- ⚡ Built with Vue.js 3 and Vite
- 🦊 Firefox WebExtension API integration

## Project Structure

```
ff-one-pager/
├── manifest.json          # Firefox extension manifest
├── popup.html            # Extension popup HTML
├── package.json          # NPM dependencies
├── vite.config.js        # Vite configuration
├── icons/                # Extension icons
├── src/
│   ├── main.js          # Vue app entry point
│   ├── App.vue          # Main Vue component
│   ├── style.css        # Global styles
│   └── assets/          # Static assets
└── dist/                # Built files (generated)
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Extension

```bash
npm run build
```

This will create a `dist` folder with the compiled Vue.js app.

### 3. Load Extension in Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..."
3. Navigate to your project folder and select the `manifest.json` file
4. The extension icon should appear in your toolbar!

### 4. Development Mode

For development with hot-reload:

```bash
npm run dev
```

This will start a development server at `http://localhost:5173` where you can preview the popup UI. However, Firefox extension APIs won't work in this mode.

For full extension development, you'll need to:
1. Make changes to your code
2. Run `npm run build`
3. Reload the extension in `about:debugging`

## How It Works

- **manifest.json**: Defines the extension metadata, permissions, and popup
- **popup.html**: The HTML file that loads when you click the extension icon
- **src/App.vue**: The main Vue component with all the UI and logic
- **Vite**: Bundles the Vue.js code into browser-compatible JavaScript

## Firefox Extension APIs Used

- `browser.tabs.query()`: Gets information about the current active tab

## Next Steps

You can extend this extension to:
- Add content scripts to modify web pages
- Add a background script for persistent functionality
- Add an options page for user settings
- Store data using `browser.storage` API
- Add more Firefox WebExtension APIs

## Notes

- Firefox uses Manifest V3 (same as Chrome, but with some differences)
- The `browser` namespace is used for Firefox (Chrome uses `chrome`)
- Icons need to be added to the `icons/` folder (48x48 and 96x96 PNG files)

## Resources

- [Firefox Extension Workshop](https://extensionworkshop.com/)
- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
