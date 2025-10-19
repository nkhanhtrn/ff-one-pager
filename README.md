


# FF One Pager – Browser Extension (Firefox & Chrome)



## Build Instructions (Firefox & Chrome)

### Operating System and Build Environment Requirements

- **Supported OS:** Linux, macOS, Windows (WSL recommended for Windows)
- **Node.js:** v18 or newer (LTS recommended)
- **npm:** v9 or newer
- **Firefox:** Latest stable or ESR (for testing)
- **Build tools:**
  - [Vite](https://vitejs.dev/) (installed via npm)
  - [web-ext](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/) (installed via npm)
  - [ImageMagick](https://imagemagick.org/) (for icon conversion, optional)

### Required Programs & Installation

1. **Node.js & npm**
	- Download and install from [nodejs.org](https://nodejs.org/)
	- Verify installation:
	  ```bash
	  node --version
	  npm --version
	  ```

2. **ImageMagick** (for icon conversion, optional unless you want to regenerate icons)
	- Linux: `sudo dnf install ImageMagick` or `sudo apt install imagemagick`
	- macOS: `brew install imagemagick`
	- Windows: [Download installer](https://imagemagick.org/script/download.php)
	- Verify: `magick -version`

3. **Firefox**
	- Download from [mozilla.org](https://www.mozilla.org/firefox/new/)


### Step-by-Step Build Instructions (Firefox & Chrome)

1. **Clone the repository**
	```bash
	git clone https://github.com/nkhanhtrn/ff-one-pager.git
	cd ff-one-pager
	```

2. **Install dependencies**
	```bash
	npm install
	```

3. **(Optional) Update icons**
	If you change `public/icon.svg`, regenerate PNG icons:
	```bash
	./update-icon.sh
	```


4. **Build for Firefox**
	```bash
	npm run build:firefox
	```
	This creates the production files in the `dist/` folder with the Firefox manifest.

5. **Build for Chrome**
	```bash
	npm run build:chrome
	```
	This creates the production files in the `dist/` folder with the Chrome manifest.

6. **Run the extension in Firefox (development mode)**
	```bash
	npm run web-ext:run
	```
	This launches Firefox with the extension loaded for live development.

7. **Manual loading for testing (Firefox)**
	- Build: `npm run build:firefox`
	- Open Firefox → `about:debugging#/runtime/this-firefox`
	- Click "Load Temporary Add-on..." and select `manifest.json` from `dist/`.

8. **Manual loading for testing (Chrome)**
	- Build: `npm run build:chrome`
	- Open Chrome → `chrome://extensions/`
	- Enable "Developer mode"
	- Click "Load unpacked" and select the `dist/` folder

9. **Pack the extension for Firefox distribution**
	```bash
	npm run web-ext:build
	```
	This creates a distributable `.zip` in `web-ext-artifacts/`.

