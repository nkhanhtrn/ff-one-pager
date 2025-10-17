
# FF One Pager – Firefox Extension Template

## How to Build, Run, and Pack

### 1. Install dependencies

```bash
npm install
```

### 2. Build the extension

```bash
npm run build
```
This will generate the production-ready files in the `dist/` folder.

### 3. Run the extension in Firefox (live reload)

```bash
npm run web-ext:run
```
This will build and launch Firefox with your extension loaded for development. Any changes to your code will trigger a rebuild and reload the extension.

### 4. Pack the extension for distribution

```bash
npm run web-ext:build
```
This will create a signed .zip file in the `web-ext-artifacts/` folder, ready for publishing or sharing.

### 5. Manual loading for testing

If you want to load the extension manually:
1. Build the extension: `npm run build`
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..." and select the `manifest.json` file from the `dist/` folder.
