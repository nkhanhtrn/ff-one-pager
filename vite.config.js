import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// ...removed viteSingleFile import...
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';

// ...removed isPWA flag for single file build...
const targetBrowser = process.env.TARGET_BROWSER || 'firefox';
const isPWA = process.env.VITE_PWA === 'true';

const base = './';

export default defineConfig({
  plugins: [
    vue(),
    ...(isPWA
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
              'favicon.svg',
              'icon-16.png',
              'icon-32.png',
              'icon-64.png',
              'icon-128.png',
              'icon-256.png',
              'index.pwa.html',
            ],
            workbox: {
              globPatterns: ['**/*.{js,css,html,png,svg,json}']
            }
          })
        ]
      : []),
    // Copy only the selected manifest to avoid accidental overwrites
    viteStaticCopy({
      targets: (() => {
        const targets = [];
        if (isPWA) {
          targets.push({ src: 'manifest.webmanifest', dest: '.' });
        } else {
          if (targetBrowser === 'chrome') {
            targets.push({ src: 'manifest.chrome.json', dest: '.', rename: 'manifest.json' });
          } else {
            targets.push({ src: 'manifest.firefox.json', dest: '.', rename: 'manifest.json' });
          }
        }
        return targets;
      })()
    })
  ],
  base,
  server: {
    port: 3000,
    open: '/one-pager/'
  },
  build: {
    rollupOptions: {
      input: {
        main: isPWA ? 'index.pwa.html' : 'index.html'
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    outDir: 'dist'
  }
});
