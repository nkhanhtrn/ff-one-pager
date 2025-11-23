# ![Coverage](./coverage/badge.svg)


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
